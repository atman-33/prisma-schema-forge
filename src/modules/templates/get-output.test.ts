import { ConfigManager } from '../../config/forge-config';
import { Column, Model } from '../../types/model';
import { readFile } from '../../utils/file';
import { getOutputByColumn, getOutputByModel, replaceToken } from './get-output';

// create mocks
jest.mock('../../config/forge-config');
jest.mock('../../utils/file');

describe('Output Functions', () => {
  const mockConfig = {
    templates: './templates',
    output: './@generated',
  };

  const mockModel: Model = {
    name: {
      pascal: 'SampleModel',
      pascalPlural: 'SampleModels',
      camel: 'sampleModel',
      camelPlural: 'sampleModels',
      kebab: 'sample-model',
      kebabPlural: 'sample-models',
    },
    columns: [
      {
        name: {
          pascal: 'Id',
          pascalPlural: 'Ids',
          camel: 'id',
          camelPlural: 'ids',
          kebab: 'id',
          kebabPlural: 'ids',
        },
        type: 'string',
        key: true,
      },
      {
        name: {
          pascal: 'Title',
          pascalPlural: 'Titles',
          camel: 'title',
          camelPlural: 'titles',
          kebab: 'title',
          kebabPlural: 'titles',
        },
        type: 'string',
        key: false,
      },
    ],
  };

  const mockColumn: Column = {
    name: {
      pascal: 'Title',
      pascalPlural: 'Titles',
      camel: 'title',
      camelPlural: 'titles',
      kebab: 'title',
      kebabPlural: 'titles',
    },
    type: 'string',
    key: false,
  };

  beforeEach(() => {
    jest.resetAllMocks();

    // common mock settings
    (ConfigManager.getConfig as jest.Mock).mockReturnValue(mockConfig);
  });

  describe('replaceToken', () => {
    it('should replace tokens in content based on model', () => {
      // Arrange
      const content = '__model__\n__modelPlural__\n__modelCamel__\n__modelColumns__';
      // Act
      const result = replaceToken(content, mockModel);
      // Assert
      expect(result).toBe('SampleModel\nSampleModels\nsampleModel\nid\ntitle');
    });
  });

  describe('getOutputByModel', () => {
    it('should generate output based on model', () => {
      // Arrange
      const mockCwd = 'home/prisma-schema-forge';
      const mockTemplatePath = 'home/prisma-schema-forge/templates/template.ts.txt';
      const mockTemplateContent = '__model__\n__modelColumns__';
      (readFile as jest.Mock).mockReturnValue(mockTemplateContent);

      // Act
      const output = getOutputByModel(mockTemplatePath, mockModel, mockCwd);

      // Assert
      expect(output.templatePath).toBe(mockTemplatePath);
      expect(output.templateContent).toBe(mockTemplateContent);
      expect(output.outputPath).toBe(
        'home/prisma-schema-forge/@generated/sample-model/template.ts',
      );
      expect(output.outputContent).toBe('SampleModel\nid\ntitle');
    });
  });

  describe('getOutputByColumn', () => {
    it('should generate output based on model and column', () => {
      // Arrange
      const mockCwd = 'home/prisma-schema-forge';
      const mockTemplatePath2 = 'home/prisma-schema-forge/templates/$column/__columnKebab__.ts.txt';
      const mockTemplateContent2 = '__column__\n__columnCamel__';
      (readFile as jest.Mock).mockReturnValue(mockTemplateContent2);

      // Act
      const output = getOutputByColumn(mockTemplatePath2, mockModel, mockColumn, mockCwd);

      expect(output.templatePath).toBe(mockTemplatePath2);
      expect(output.templateContent).toBe(mockTemplateContent2);
      expect(output.outputPath).toBe(
        'home/prisma-schema-forge/@generated/sample-model/title/title.ts',
      );
      expect(output.outputContent).toBe('Title\ntitle');
    });
  });
});
