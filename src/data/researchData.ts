export const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Analysis', href: '#analysis' },
  { label: 'Methodology', href: '#methodology' },
  { label: 'Results', href: '#results' },
  { label: 'About Research', href: '#about-research' },
];

export const classDescriptions = [
  { code: 'akiec', label: 'Actinic keratoses / intraepithelial carcinoma', short: 'akiec' },
  { code: 'bcc', label: 'Basal cell carcinoma', short: 'bcc' },
  { code: 'bkl', label: 'Benign keratosis-like lesions', short: 'bkl' },
  { code: 'df', label: 'Dermatofibroma', short: 'df' },
  { code: 'mel', label: 'Melanoma', short: 'mel' },
  { code: 'nv', label: 'Melanocytic nevi', short: 'nv' },
  { code: 'scc', label: 'Squamous cell carcinoma', short: 'scc' },
  { code: 'vasc', label: 'Vascular lesions', short: 'vasc' },
];

export const datasetDistribution = [
  { name: 'akiec', value: 867, pct: 3.4 },
  { name: 'bcc', value: 3323, pct: 13.11 },
  { name: 'bkl', value: 2624, pct: 10.35 },
  { name: 'df', value: 239, pct: 0.94 },
  { name: 'mel', value: 4522, pct: 17.81 },
  { name: 'nv', value: 12875, pct: 50.8 },
  { name: 'scc', value: 628, pct: 2.47 },
  { name: 'vasc', value: 253, pct: 0.99 },
];

export const modelComparison = [
  { model: 'B0', accuracy: 86.86 },
  { model: 'B1', accuracy: 87.65 },
  { model: 'B2', accuracy: 88.84 },
  { model: 'B3', accuracy: 88.67 },
  { model: 'B4', accuracy: 90.0 },
  { model: 'B5', accuracy: 93.5 },
  { model: 'B6', accuracy: 88.46 },
  { model: 'B7', accuracy: 88.56 },
];

export const tableMetrics = [
  { model: 'B0', accuracy: 86.86, precision: 87.0, recall: 86.5, fscore: 86.74, roc: 0.93 },
  { model: 'B1', accuracy: 87.65, precision: 87.0, recall: 88.0, fscore: 87.5, roc: 0.94 },
  { model: 'B2', accuracy: 88.84, precision: 87.0, recall: 89.0, fscore: 88.0, roc: 0.95 },
  { model: 'B3', accuracy: 88.67, precision: 87.12, recall: 88.25, fscore: 87.68, roc: 0.95 },
  { model: 'B4', accuracy: 90.0, precision: 90.0, recall: 90.0, fscore: 90.0, roc: 0.96 },
  { model: 'B5', accuracy: 93.5, precision: 92.5, recall: 94.5, fscore: 93.5, roc: 0.97 },
  { model: 'B6', accuracy: 88.46, precision: 89.0, recall: 89.0, fscore: 89.0, roc: 0.95 },
  { model: 'B7', accuracy: 88.56, precision: 90.0, recall: 88.0, fscore: 89.0, roc: 0.95 },
];

export const demoProfiles = [
  {
    title: 'Melanocytic Nevus',
    label: 'nv',
    confidence: 87.4,
    probabilities: { akiec: 2.1, bcc: 3.8, bkl: 7.9, df: 1.4, mel: 18.2, nv: 87.4, scc: 1.8, vasc: 1.4 },
  },
  {
    title: 'Melanoma',
    label: 'mel',
    confidence: 72.8,
    probabilities: { akiec: 2.7, bcc: 3.4, bkl: 9.4, df: 1.5, mel: 72.8, nv: 14.0, scc: 3.3, vasc: 1.9 },
  },
  {
    title: 'Basal Cell Carcinoma',
    label: 'bcc',
    confidence: 64.6,
    probabilities: { akiec: 7.1, bcc: 64.6, bkl: 8.2, df: 2.3, mel: 11.5, nv: 3.8, scc: 7.5, vasc: 1.1 },
  },
  {
    title: 'Benign Keratosis',
    label: 'bkl',
    confidence: 66.3,
    probabilities: { akiec: 5.2, bcc: 5.3, bkl: 66.3, df: 2.4, mel: 10.8, nv: 8.1, scc: 4.5, vasc: 1.9 },
  },
];

export const methodologySteps = [
  'Dataset',
  'Preprocessing',
  'Train / Validation / Test',
  'Model Training',
  'Fine-Tuning',
  'Evaluation',
];

export const researchQuestions = [
  {
    id: 'RQ1',
    question: 'Is modification of the top layers and fine-tuning of the base architecture necessary for effective skin lesion classification using EfficientNets models?',
    finding: 'Modification and fine-tuning improved classification performance.',
  },
  {
    id: 'RQ2',
    question: 'Does the presence of hair in skin lesions impact classification performance?',
    finding: 'Hair removal improved classification accuracy in the evaluated models.',
  },
  {
    id: 'RQ3',
    question: 'Which EfficientNets model is the most effective for skin lesion classification?',
    finding: 'EfficientNetB5 achieved the strongest performance in this study.',
  },
];

export const architectureFlow = [
  'Input',
  'EfficientNet Backbone',
  'Global Average Pooling',
  'Dense Layer',
  'Dropout',
  'Batch Normalization',
  'Dense Layer',
  'Dropout / Batch Normalization as applicable',
  '7-Class Softmax Output',
];

export const preprocessingPipeline = [
  'Input Image',
  'Digital Hair Removal',
  'Feature Extraction',
  'Modified EfficientNet',
  'Multi-Class Classification',
  'Probability Distribution',
];

export const bestParameters = {
  'B0-B2': {
    batchSize: 32,
    learningRate: 0.00001,
    epochs: 100,
    optimizer: 'Adam',
  },
  'B3-B5': {
    batchSize: 16,
    learningRate: 0.0001,
    epochs: 100,
    optimizer: 'Adam',
  },
  'B6-B7': {
    batchSize: 8,
    learningRate: 0.001,
    epochs: 100,
    optimizer: 'SGD',
  },
};
