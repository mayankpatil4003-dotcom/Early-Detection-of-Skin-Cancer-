import { useMemo, useState } from 'react';
import {
  Activity,
  ArrowRight,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  CircleDashed,
  Download,
  FileImage,
  FlaskConical,
  ImagePlus,
  Layers3,
  Menu,
  Microscope,
  ShieldAlert,
  Sparkles,
  Stethoscope,
  Target,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  architectureFlow,
  bestParameters,
  classDescriptions,
  datasetDistribution,
  demoProfiles,
  methodologySteps,
  modelComparison,
  navItems,
  preprocessingPipeline,
  researchQuestions,
  tableMetrics,
} from './data/researchData';

type DemoClassKey = keyof (typeof demoProfiles)[0]['probabilities'];

type FileMeta = {
  name: string;
  url: string;
  width: number;
  height: number;
};

const classColors: Record<string, string> = {
  akiec: '#f43f5e',
  bcc: '#fb7185',
  bkl: '#f59e0b',
  df: '#a78bfa',
  mel: '#ef4444',
  nv: '#22c55e',
  scc: '#fb923c',
  vasc: '#06b6d4',
};

const formatPct = (value: number) => `${value.toFixed(2)}%`;

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<FileMeta | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisPhase, setAnalysisPhase] = useState(0);
  const [demoResult, setDemoResult] = useState<typeof demoProfiles[number] | null>(null);

  const datasetChartData = useMemo(
    () => datasetDistribution.map((item) => ({ ...item, fill: classColors[item.name] })),
    [],
  );

  const handleFileUpload = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const url = String(reader.result || '');
      const img = new Image();
      img.onload = () => {
        setUploadedImage({
          name: file.name,
          url,
          width: img.width,
          height: img.height,
        });
      };
      img.src = url;
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setUploadedImage(null);
    setDemoResult(null);
    setIsAnalyzing(false);
    setAnalysisPhase(0);
  };

  const startAnalysis = () => {
    if (!uploadedImage) return;
    setDemoResult(null);
    setIsAnalyzing(true);
    setAnalysisPhase(0);

    const phases = [
      'Image preprocessing',
      'Hair artifact analysis',
      'Feature extraction',
      'Classification',
      'Generating result',
    ];

    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setAnalysisPhase(index);
      if (index >= phases.length) {
        clearInterval(interval);
        const nextProfile = demoProfiles[Math.floor(Math.random() * demoProfiles.length)];
        setTimeout(() => {
          setDemoResult(nextProfile);
          setIsAnalyzing(false);
        }, 500);
      }
    }, 600);
  };

  const resultProbabilities = useMemo(() => {
    if (!demoResult) return [];
    return Object.entries(demoResult.probabilities)
      .map(([key, value]) => ({ label: key, value }))
      .sort((a, b) => b.value - a.value);
  }, [demoResult]);

  const chartData = useMemo(
    () =>
      tableMetrics.map((row) => ({
        ...row,
        fill: row.model === 'B5' ? '#2563eb' : '#cbd5e1',
      })),
    [],
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
        <div className="section-shell flex items-center justify-between py-4">
          <a href="#home" className="flex items-center gap-3" aria-label="DermaVision AI home">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-700 shadow-soft">
              <BrainCircuit className="h-5 w-5" />
            </div>
            <div>
              <div className="text-lg font-bold tracking-tight text-slate-900">DermaVision AI</div>
            </div>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="text-sm font-medium text-slate-600 transition hover:text-slate-900">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex">
            <a href="#analysis" className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-soft transition hover:bg-slate-800">
              Analyze Image
            </a>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white md:hidden"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label="Toggle navigation"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-slate-200 bg-white md:hidden">
            <div className="section-shell space-y-3 py-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block rounded-lg px-2 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a href="#analysis" className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white">
                Analyze Image
              </a>
            </div>
          </div>
        )}
      </header>

      <main>
        <section id="home" className="section-shell grid items-center gap-12 py-16 md:py-20 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-sky-700">
              <Sparkles className="h-3.5 w-3.5" />
              Based on ISIC2019 Research
            </div>
            <div className="space-y-5">
              <h1 className="max-w-xl text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                AI-Assisted <span className="title-gradient">Skin Lesion Classification</span>
              </h1>
              <p className="max-w-xl text-lg leading-8 text-slate-600">
                Explore an interactive research prototype inspired by modified EfficientNet architectures for multi-class skin lesion classification.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a href="#analysis" className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white shadow-soft transition hover:bg-slate-800">
                Analyze a Lesion
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#about-research" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
                Explore Research
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Frontend-only prototype</div>
              <div className="flex items-center gap-2"><ShieldAlert className="h-4 w-4 text-amber-500" /> Not a medical diagnostic tool</div>
            </div>
          </div>

          <div className="relative">
            <div className="grid-pattern absolute -inset-6 rounded-[32px] bg-white/40 opacity-70" />
            <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  Dermoscopic preview
                </div>
                <span className="rounded-full bg-sky-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-700">
                  Demo mode
                </span>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-100 via-slate-50 to-sky-50 p-4">
                <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(14,165,233,0.2), transparent 16%), radial-gradient(circle at 70% 40%, rgba(139,92,246,0.18), transparent 20%)' }} />
                <div className="relative h-72 rounded-2xl bg-[radial-gradient(circle_at_30%_25%,rgba(8,145,178,0.3),transparent_18%),linear-gradient(135deg,#0f172a_0%,#1e293b_18%,#0f172a_35%,#1e293b_100%)] shadow-inner">
                  <div className="absolute inset-8 rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_50%_50%,rgba(20,184,166,0.6),transparent_32%),radial-gradient(circle_at_30%_55%,rgba(255,255,255,0.1),transparent_30%),linear-gradient(135deg,#0b1120_0%,#111827_35%,#1e293b_100%)]" />
                  <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-emerald-400/60 bg-emerald-500/10" />
                  <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-300/70 bg-sky-500/10" />
                  <div className="absolute bottom-3 left-3 h-20 w-20 rounded-full border border-white/20 bg-white/5 blur-sm" />
                  <div className="absolute right-5 top-5 h-20 w-20 rounded-full border border-white/15 bg-white/5 blur-sm" />
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Simulation</p>
                    <p className="text-lg font-bold text-slate-900">Predicted class</p>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">87.4%</span>
                </div>
                <div className="space-y-2.5">
                  {[
                    { label: 'nv', value: 87, color: '#22c55e' },
                    { label: 'mel', value: 18, color: '#ef4444' },
                    { label: 'bkl', value: 9, color: '#f59e0b' },
                  ].map((bar) => (
                    <div key={bar.label}>
                      <div className="mb-1 flex justify-between text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500">
                        <span>{bar.label}</span>
                        <span>{bar.value}%</span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
                        <div className="h-full rounded-full" style={{ width: `${bar.value}%`, background: bar.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="analysis" className="section-shell py-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">Analysis</p>
              <h2 className="text-3xl font-black tracking-tight text-slate-900">Research Prototype</h2>
            </div>
            <div className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
              Research Prototype • Simulated Classification
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="card-glass rounded-[28px] p-5 sm:p-8">
              {!uploadedImage ? (
                <label className="group flex min-h-[420px] cursor-pointer flex-col items-center justify-center rounded-[24px] border-2 border-dashed border-slate-300 bg-slate-50/80 p-6 text-center transition hover:border-sky-400 hover:bg-sky-50/60">
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    className="hidden"
                    onChange={(event) => handleFileUpload(event.target.files?.[0])}
                  />
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-soft">
                    <Upload className="h-8 w-8 text-sky-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Upload Dermoscopic Image</h3>
                  <p className="mt-3 max-w-md text-base text-slate-600">
                    Drag and drop an image here, or browse from your device.
                  </p>
                  <p className="mt-5 text-sm font-medium text-slate-500">Supported formats: JPG, JPEG, PNG</p>
                  <div className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-soft">
                    <ImagePlus className="h-4 w-4" />
                    Browse files
                  </div>
                </label>
              ) : (
                <div className="space-y-5">
                  <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-slate-100">
                    <img src={uploadedImage.url} alt="Uploaded lesion preview" className="h-[350px] w-full object-cover" />
                  </div>
                  <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-slate-500">Filename</p>
                      <p className="font-semibold text-slate-900">{uploadedImage.name}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-slate-500">Dimensions</p>
                      <p className="font-semibold text-slate-900">{uploadedImage.width} × {uploadedImage.height}px</p>
                    </div>
                    <button type="button" onClick={removeImage} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
                      <Trash2 className="h-4 w-4" />
                      Remove image
                    </button>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button type="button" onClick={startAnalysis} className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white shadow-soft transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400" disabled={isAnalyzing}>
                      <Activity className="h-4 w-4" />
                      {isAnalyzing ? 'Analyzing...' : 'Start Analysis'}
                    </button>
                    <button type="button" onClick={removeImage} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                      Reset
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-5">
              <div className="card-glass rounded-[28px] p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">Classification</p>
                    <h3 className="text-2xl font-bold text-slate-900">Demo result</h3>
                  </div>
                  {demoResult ? (
                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-700">
                      Simulated
                    </span>
                  ) : (
                    <span className="rounded-full border border-slate-200 bg-slate-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                      Awaiting result
                    </span>
                  )}
                </div>

                {isAnalyzing ? (
                  <div className="space-y-4 pt-2">
                    {['Image preprocessing', 'Hair artifact analysis', 'Feature extraction', 'Classification', 'Generating result'].map((step, idx) => (
                      <div key={step}>
                        <div className="mb-1 flex items-center justify-between text-sm font-medium text-slate-700">
                          <span>{step}</span>
                          <span>{idx <= analysisPhase ? 'Running' : 'Queued'}</span>
                        </div>
                        <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
                          <div className="progress-fill h-full rounded-full transition-all duration-500" style={{ width: `${idx <= analysisPhase ? ((idx + 1) / 5) * 100 : 0}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : demoResult ? (
                  <div className="space-y-5">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-sm uppercase tracking-[0.14em] text-slate-500">Classification Result</p>
                      <div className="mt-3 flex items-end justify-between gap-3">
                        <div>
                          <h4 className="text-2xl font-extrabold text-slate-900">{demoResult.title}</h4>
                          <p className="text-sm text-slate-500">({demoResult.label})</p>
                        </div>
                        <div className="rounded-xl bg-emerald-100 px-3 py-2 text-lg font-bold text-emerald-700">
                          {demoResult.confidence.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {resultProbabilities.map(({ label, value }) => (
                        <div key={label}>
                          <div className="mb-1 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                            <span>{label}</span>
                            <span>{value.toFixed(1)}%</span>
                          </div>
                          <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${Math.min(value, 100)}%`,
                                background: classColors[label] || '#2563eb',
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
                      This is example mock output for the frontend prototype only.
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
                    Upload an image and run the simulated analysis to preview the research prototype output.
                  </div>
                )}
              </div>

              <div className="card-glass rounded-[28px] p-5">
                <div className="mb-4 flex items-center gap-2">
                  <Microscope className="h-5 w-5 text-sky-700" />
                  <h3 className="text-xl font-bold text-slate-900">Pipeline Summary</h3>
                </div>
                <div className="space-y-3">
                  {preprocessingPipeline.map((stage, index) => (
                    <div key={stage} className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-xs font-bold text-sky-700">
                        {index + 1}
                      </div>
                      <span className="text-sm font-medium text-slate-700">{stage}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-900 py-20 text-white">
          <div className="section-shell">
            <div className="mb-10 max-w-3xl">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-sky-300">Eight classes</p>
              <h2 className="text-3xl font-black tracking-tight">ISIC2019 lesion categories represented in the study</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {classDescriptions.map((item) => (
                <div key={item.code} className="rounded-[22px] border border-slate-700 bg-slate-800/80 p-5 transition hover:-translate-y-1 hover:border-sky-400/60">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="rounded-full bg-sky-500/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-300">
                      {item.short}
                    </span>
                    <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: classColors[item.code] }} />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-white">{item.code}</h3>
                  <p className="text-sm leading-6 text-slate-300">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell py-20" id="methodology">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">Research Pipeline</p>
            <h2 className="text-3xl font-black tracking-tight text-slate-900">A visual summary of the study workflow</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-6">
            {preprocessingPipeline.map((stage, index) => (
              <div key={stage} className="group relative rounded-[22px] border border-slate-200 bg-white p-4 shadow-soft transition hover:-translate-y-1 hover:border-sky-300">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-sm font-bold text-sky-700">
                  {index + 1}
                </div>
                <p className="text-base font-semibold text-slate-900">{stage}</p>
                {index === 1 && (
                  <div className="mt-4 rounded-xl bg-slate-50 p-3 text-xs leading-5 text-slate-600">
                    RGB → grayscale • black-hat transformation • mask generation • inpainting/restoration
                  </div>
                )}
                {index < preprocessingPipeline.length - 1 && <ChevronRight className="absolute -right-1 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-slate-300 md:block" />}
              </div>
            ))}
          </div>

          <div className="mt-20 rounded-[30px] border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">Hair removal</p>
                <h3 className="text-3xl font-black tracking-tight text-slate-900">Impact of Hair Removal</h3>
              </div>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-slate-100">
                <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
                  <span className="text-sm font-semibold text-slate-700">Original Image</span>
                </div>
                <div className="h-[280px] bg-[radial-gradient(circle_at_30%_30%,rgba(148,163,184,0.18),transparent_18%),linear-gradient(135deg,#111827,#374151,#1f2937)]">
                  <div className="relative h-full w-full overflow-hidden">
                    <div className="absolute inset-0 opacity-80" style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.5) 0%, rgba(51,65,85,0.15) 100%)' }} />
                    <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border-[12px] border-emerald-300/80 bg-emerald-400/10" />
                    <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-sky-200/80 bg-sky-300/10" />
                    <div className="absolute left-[22%] top-[28%] h-12 w-1.5 rotate-[18deg] rounded-full bg-slate-200/80" />
                    <div className="absolute left-[68%] top-[30%] h-14 w-1.5 rotate-[-25deg] rounded-full bg-slate-200/70" />
                    <div className="absolute left-[60%] top-[52%] h-16 w-1.5 rotate-[12deg] rounded-full bg-slate-200/75" />
                  </div>
                </div>
              </div>
              <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-slate-100">
                <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
                  <span className="text-sm font-semibold text-slate-700">Hair Removed</span>
                </div>
                <div className="h-[280px] bg-[radial-gradient(circle_at_30%_30%,rgba(20,184,166,0.12),transparent_16%),linear-gradient(135deg,#e2e8f0,#f8fafc,#dbeafe)]">
                  <div className="relative h-full w-full overflow-hidden">
                    <div className="absolute inset-10 rounded-full border-[10px] border-emerald-400/80 bg-emerald-100/50" />
                    <div className="absolute inset-[20%] rounded-full border-[6px] border-sky-300/80 bg-sky-100/30" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.22),transparent_36%)]" />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
              The study reports improved classification accuracy after hair removal across the evaluated EfficientNet models.
            </div>
          </div>
        </section>

        <section className="bg-slate-100 py-20" id="results">
          <div className="section-shell">
            <div className="mb-8">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">Model comparison</p>
              <h2 className="text-3xl font-black tracking-tight text-slate-900">EfficientNet Model Comparison</h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
              <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-900">Reported top-1 accuracy</h3>
                  <span className="rounded-full bg-sky-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-sky-700">B5 highest</span>
                </div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={modelComparison}>
                      <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" />
                      <XAxis dataKey="model" stroke="#475569" />
                      <YAxis stroke="#475569" domain={[80, 100]} tickFormatter={(value) => `${value}`} />
                      <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
                      <Bar dataKey="accuracy" radius={[8, 8, 0, 0]}>
                        {modelComparison.map((entry) => (
                          <Cell key={entry.model} fill={entry.model === 'B5' ? '#2563eb' : '#cbd5e1'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="space-y-5">
                <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft">
                  <div className="mb-4 flex items-center gap-2">
                    <Target className="h-5 w-5 text-sky-700" />
                    <h3 className="text-xl font-bold text-slate-900">EfficientNetB5</h3>
                  </div>
                  <div className="space-y-3 text-sm text-slate-700">
                    <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2"><span>Accuracy</span><span className="font-semibold">93.50%</span></div>
                    <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2"><span>Precision</span><span className="font-semibold">92.5%</span></div>
                    <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2"><span>Recall</span><span className="font-semibold">94.5%</span></div>
                    <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2"><span>F-Score</span><span className="font-semibold">93.5%</span></div>
                    <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2"><span>ROC</span><span className="font-semibold">0.97</span></div>
                  </div>
                </div>

                <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft">
                  <p className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">Research note</p>
                  <p className="text-sm leading-6 text-slate-600">
                    The paper reports improvement ranging from 0.91% for B0 to 4.89% for B5 in top-1 accuracy after hair removal.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
              <div className="mb-6 flex items-center justify-between gap-3">
                <h3 className="text-2xl font-black text-slate-900">Research results dashboard</h3>
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Accuracy</p>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" />
                        <XAxis dataKey="model" stroke="#475569" />
                        <YAxis stroke="#475569" domain={[80, 100]} />
                        <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
                        <Bar dataKey="accuracy" radius={[8, 8, 0, 0]}>
                          {chartData.map((row) => (
                            <Cell key={row.model} fill={row.model === 'B5' ? '#2563eb' : '#cbd5e1'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Precision, recall, F-score, ROC</p>
                  <div className="space-y-4">
                    {['precision', 'recall', 'fscore', 'roc'].map((metric) => (
                      <div key={metric}>
                        <div className="mb-1 flex items-center justify-between text-sm font-medium text-slate-700">
                          <span className="capitalize">{metric}</span>
                          <span>
                            {metric === 'roc'
                              ? '0.97'
                              : `${Math.max(...chartData.map((row) => row[metric as keyof typeof row] as number))}`}
                          </span>
                        </div>
                        <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
                          <div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-emerald-500" style={{ width: `${metric === 'roc' ? 97 : 90}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell py-20" id="about-research">
          <div className="mb-8 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">About research</p>
            <h2 className="text-3xl font-black tracking-tight text-slate-900">Research overview</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
                <h3 className="mb-5 text-2xl font-black text-slate-900">Enhancing Multi-Class Skin Lesion Classification with Modified EfficientNets</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-sm uppercase tracking-[0.14em] text-slate-500">Authors</p>
                    <p className="mt-2 text-base font-semibold text-slate-900">Research team</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-sm uppercase tracking-[0.14em] text-slate-500">Dataset</p>
                    <p className="mt-2 text-base font-semibold text-slate-900">ISIC2019</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
                <h3 className="mb-4 text-xl font-bold text-slate-900">Research Questions</h3>
                <div className="space-y-4">
                  {researchQuestions.map((item) => (
                    <div key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-700">{item.id}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-700">{item.question}</p>
                      <p className="mt-3 text-sm font-semibold text-slate-900">Finding: {item.finding}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
                <h3 className="mb-4 text-xl font-bold text-slate-900">Methodology</h3>
                <div className="space-y-4">
                  {['Dataset', 'Preprocessing', 'Train / Validation / Test', 'Model Training', 'Fine-Tuning', 'Evaluation'].map((step) => (
                    <div key={step} className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      <span className="text-sm font-medium text-slate-700">{step}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                  Training: 70% • Validation: 10% • Testing: 20%<br />
                  Categorical cross entropy • Early stopping with patience 20 • Class weights to address class imbalance
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
                <h3 className="mb-4 text-xl font-bold text-slate-900">Limitations and future work</h3>
                <ul className="space-y-3 text-sm leading-6 text-slate-700">
                  <li>• The findings are based on a single dataset, ISIC2019, and performance may vary across different datasets or clinical settings.</li>
                  <li>• Future directions include additional EfficientNet models, alternative transfer learning approaches, combining benchmark datasets, and GANs for addressing class imbalance.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-900 py-20 text-white">
          <div className="section-shell">
            <div className="mb-10 flex items-center justify-between gap-4">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-sky-300">Dataset</p>
                <h2 className="text-3xl font-black tracking-tight">ISIC2019 Dataset</h2>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-[28px] border border-slate-700 bg-slate-800/80 p-6">
                <div className="mb-5 text-center">
                  <p className="text-3xl font-black text-white">25,331</p>
                  <p className="mt-1 text-sm uppercase tracking-[0.14em] text-slate-300">pigmented skin lesions</p>
                </div>
                <div className="mb-6 text-center">
                  <p className="text-2xl font-bold text-sky-300">8 classes</p>
                  <p className="mt-1 text-sm text-slate-300">Notable class imbalance.</p>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={datasetChartData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={82} paddingAngle={2}>
                        {datasetChartData.map((entry) => (
                          <Cell key={entry.name} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => `${value} lesions`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-700 bg-slate-800/80 p-6">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">Class distribution</h3>
                  <span className="rounded-full bg-slate-700 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-300">Paper values</span>
                </div>
                <div className="space-y-4">
                  {datasetDistribution.map((item) => (
                    <div key={item.name}>
                      <div className="mb-1 flex items-center justify-between text-sm text-slate-300">
                        <span>{item.name} — {item.pct}%</span>
                        <span>{item.value}</span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-slate-700">
                        <div className="h-full rounded-full" style={{ width: `${Math.min((item.value / 12875) * 100, 100)}%`, background: classColors[item.name] }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell py-20">
          <div className="mb-8 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">Methodology</p>
            <h2 className="text-3xl font-black tracking-tight text-slate-900">Training methodology</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-6">
            {methodologySteps.map((step, index) => (
              <div key={step} className="rounded-[22px] border border-slate-200 bg-white p-4 text-center shadow-soft">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sm font-bold text-sky-700">
                  {index + 1}
                </div>
                <p className="text-sm font-semibold text-slate-800">{step}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {Object.entries(bestParameters).map(([label, params]) => (
              <div key={label} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
                <p className="mb-4 text-lg font-bold text-slate-900">{label}</p>
                <div className="space-y-3 text-sm text-slate-700">
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2"><span>Batch Size</span><span className="font-semibold">{params.batchSize}</span></div>
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2"><span>Learning Rate</span><span className="font-semibold">{params.learningRate}</span></div>
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2"><span>Epochs</span><span className="font-semibold">{params.epochs}</span></div>
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2"><span>Optimizer</span><span className="font-semibold">{params.optimizer}</span></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
            <h3 className="mb-4 text-xl font-bold text-slate-900">Reported training setup</h3>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl bg-slate-50 p-4"><p className="text-sm uppercase tracking-[0.14em] text-slate-500">Split</p><p className="mt-2 font-semibold text-slate-900">70% / 10% / 20%</p></div>
              <div className="rounded-2xl bg-slate-50 p-4"><p className="text-sm uppercase tracking-[0.14em] text-slate-500">Loss</p><p className="mt-2 font-semibold text-slate-900">Categorical cross entropy</p></div>
              <div className="rounded-2xl bg-slate-50 p-4"><p className="text-sm uppercase tracking-[0.14em] text-slate-500">Early stopping</p><p className="mt-2 font-semibold text-slate-900">Patience 20</p></div>
              <div className="rounded-2xl bg-slate-50 p-4"><p className="text-sm uppercase tracking-[0.14em] text-slate-500">Class imbalance</p><p className="mt-2 font-semibold text-slate-900">Class weights</p></div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-20">
          <div className="section-shell">
            <div className="mb-8 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">Architecture</p>
              <h2 className="text-3xl font-black tracking-tight text-slate-900">Modified EfficientNet Architecture</h2>
            </div>
            <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-9">
              {architectureFlow.map((step, index) => (
                <div key={step} className="rounded-[22px] border border-slate-200 bg-white p-3 text-center shadow-soft">
                  <div className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-sky-100 text-xs font-bold text-sky-700">{index + 1}</div>
                  <p className="text-xs font-medium leading-5 text-slate-700">{step}</p>
                  {index < architectureFlow.length - 1 && <div className="mt-3 flex justify-center text-slate-300"><ArrowRight className="h-4 w-4" /></div>}
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-[24px] border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-600">
              The original ImageNet top layers were modified for the skin lesion classification task. For B0–B5, the study used additional dense, dropout, and batch-normalization layers; for B6–B7, a different five-layer modification was used to reduce overfitting.
            </div>
          </div>
        </section>

        <section className="section-shell py-20">
          <div className="mb-8 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">Disclaimer</p>
            <h2 className="text-3xl font-black tracking-tight text-slate-900">Prototype disclaimer</h2>
          </div>
          <div className="rounded-[24px] border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
            “This research prototype is intended for educational and demonstration purposes only. It does not provide medical diagnosis, medical advice, or treatment recommendations. Skin lesion assessment should be performed by qualified healthcare professionals.”
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white/80">
        <div className="section-shell flex flex-col gap-4 py-8 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
              <BrainCircuit className="h-4 w-4" />
            </div>
            <span className="font-semibold text-slate-900">DermaVision AI</span>
          </div>
          <div className="flex items-center gap-5">
            <a href="#home" className="hover:text-slate-900">Home</a>
            <a href="#analysis" className="hover:text-slate-900">Analysis</a>
            <a href="#methodology" className="hover:text-slate-900">Methodology</a>
            <a href="#results" className="hover:text-slate-900">Results</a>
            <a href="#about-research" className="hover:text-slate-900">About Research</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
