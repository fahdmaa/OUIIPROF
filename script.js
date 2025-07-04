// OOUI PROF - Modern JavaScript
// Enhanced with animations, interactions, and modern features

// === GLOBAL VARIABLES ===
let currentLanguage = 'fr';
let currentTheme = 'light';
let isLoading = true;
let scrollPosition = 0;
let animationObserver = null;

// Store original French text for language switching
let originalFrenchTexts = new Map();

// === SUBJECT MODAL DATA ===
const subjectModalData = {
    'corporate-finance': {
        title: {
            fr: 'Finance d\'Entreprise',
            en: 'Corporate Finance',
            ar: 'المالية الشركات'
        },
        content: {
            fr: `
                <div class="modal-subject-content">
                    <h4>Objectifs d'apprentissage</h4>
                    <ul>
                        <li>Comprendre la structure du capital et les décisions de financement</li>
                        <li>Analyser les décisions d'investissement et l'évaluation de projets</li>
                        <li>Maîtriser la planification financière et la budgétisation</li>
                        <li>Évaluer les stratégies de fusion et acquisition</li>
                    </ul>
                    <h4>Sujets couverts</h4>
                    <ul>
                        <li>Valeur temporelle de l'argent et flux de trésorerie actualisés</li>
                        <li>Coût du capital et structure optimale du capital</li>
                        <li>Politique de dividende et rachat d'actions</li>
                        <li>Gestion du fonds de roulement</li>
                    </ul>
                </div>
            `,
            en: `
                <div class="modal-subject-content">
                    <h4>Learning Objectives</h4>
                    <ul>
                        <li>Understand capital structure and financing decisions</li>
                        <li>Analyze investment decisions and project valuation</li>
                        <li>Master financial planning and budgeting</li>
                        <li>Evaluate merger and acquisition strategies</li>
                    </ul>
                    <h4>Topics Covered</h4>
                    <ul>
                        <li>Time value of money and discounted cash flows</li>
                        <li>Cost of capital and optimal capital structure</li>
                        <li>Dividend policy and share repurchases</li>
                        <li>Working capital management</li>
                    </ul>
                </div>
            `,
            ar: `
                <div class="modal-subject-content">
                    <h4>أهداف التعلم</h4>
                    <ul>
                        <li>فهم هيكل رأس المال وقرارات التمويل</li>
                        <li>تحليل قرارات الاستثمار وتقييم المشاريع</li>
                        <li>إتقان التخطيط المالي وإعداد الميزانيات</li>
                        <li>تقييم استراتيجيات الاندماج والاستحواذ</li>
                    </ul>
                    <h4>الموضوعات المغطاة</h4>
                    <ul>
                        <li>القيمة الزمنية للمال والتدفقات النقدية المخصومة</li>
                        <li>تكلفة رأس المال والهيكل الأمثل لرأس المال</li>
                        <li>سياسة الأرباح وإعادة شراء الأسهم</li>
                        <li>إدارة رأس المال العامل</li>
                    </ul>
                </div>
            `
        }
    },
    'investment': {
        title: {
            fr: 'Investissement',
            en: 'Investment',
            ar: 'الاستثمار'
        },
        content: {
            fr: `
                <div class="modal-subject-content">
                    <h4>Objectifs d'apprentissage</h4>
                    <ul>
                        <li>Comprendre les principes fondamentaux de l'investissement</li>
                        <li>Analyser les différents types d'actifs et leurs caractéristiques</li>
                        <li>Maîtriser les techniques d'évaluation des investissements</li>
                        <li>Gérer efficacement un portefeuille d'investissement</li>
                    </ul>
                    <h4>Sujets couverts</h4>
                    <ul>
                        <li>Théorie moderne du portefeuille et diversification</li>
                        <li>Modèles d'évaluation des actifs (CAPM, APT)</li>
                        <li>Analyse technique et fondamentale</li>
                        <li>Gestion des risques et allocation d'actifs</li>
                    </ul>
                </div>
            `,
            en: `
                <div class="modal-subject-content">
                    <h4>Learning Objectives</h4>
                    <ul>
                        <li>Understand fundamental principles of investment</li>
                        <li>Analyze different types of assets and their characteristics</li>
                        <li>Master investment valuation techniques</li>
                        <li>Effectively manage an investment portfolio</li>
                    </ul>
                    <h4>Topics Covered</h4>
                    <ul>
                        <li>Modern portfolio theory and diversification</li>
                        <li>Asset pricing models (CAPM, APT)</li>
                        <li>Technical and fundamental analysis</li>
                        <li>Risk management and asset allocation</li>
                    </ul>
                </div>
            `,
            ar: `
                <div class="modal-subject-content">
                    <h4>أهداف التعلم</h4>
                    <ul>
                        <li>فهم المبادئ الأساسية للاستثمار</li>
                        <li>تحليل أنواع الأصول المختلفة وخصائصها</li>
                        <li>إتقان تقنيات تقييم الاستثمارات</li>
                        <li>إدارة محفظة استثمارية بفعالية</li>
                    </ul>
                    <h4>الموضوعات المغطاة</h4>
                    <ul>
                        <li>نظرية المحفظة الحديثة والتنويع</li>
                        <li>نماذج تسعير الأصول (CAPM، APT)</li>
                        <li>التحليل الفني والأساسي</li>
                        <li>إدارة المخاطر وتخصيص الأصول</li>
                    </ul>
                </div>
            `
        }
    },
    'banking': {
        title: {
            fr: 'Banque',
            en: 'Banking',
            ar: 'المصرفية'
        },
        content: {
            fr: `
                <div class="modal-subject-content">
                    <h4>Objectifs d'apprentissage</h4>
                    <ul>
                        <li>Comprendre le système bancaire et ses fonctions</li>
                        <li>Analyser les opérations bancaires et les services financiers</li>
                        <li>Maîtriser l'analyse de crédit et la gestion des risques</li>
                        <li>Évaluer la performance bancaire et la réglementation</li>
                    </ul>
                    <h4>Sujets couverts</h4>
                    <ul>
                        <li>Intermédiation financière et création monétaire</li>
                        <li>Gestion actif-passif et risque de liquidité</li>
                        <li>Réglementation bancaire et accords de Bâle</li>
                        <li>Banque d'investissement et marchés de capitaux</li>
                    </ul>
                </div>
            `,
            en: `
                <div class="modal-subject-content">
                    <h4>Learning Objectives</h4>
                    <ul>
                        <li>Understand the banking system and its functions</li>
                        <li>Analyze banking operations and financial services</li>
                        <li>Master credit analysis and risk management</li>
                        <li>Evaluate banking performance and regulation</li>
                    </ul>
                    <h4>Topics Covered</h4>
                    <ul>
                        <li>Financial intermediation and money creation</li>
                        <li>Asset-liability management and liquidity risk</li>
                        <li>Banking regulation and Basel Accords</li>
                        <li>Investment banking and capital markets</li>
                    </ul>
                </div>
            `,
            ar: `
                <div class="modal-subject-content">
                    <h4>أهداف التعلم</h4>
                    <ul>
                        <li>فهم النظام المصرفي ووظائفه</li>
                        <li>تحليل العمليات المصرفية والخدمات المالية</li>
                        <li>إتقان تحليل الائتمان وإدارة المخاطر</li>
                        <li>تقييم الأداء المصرفي والتنظيم</li>
                    </ul>
                    <h4>الموضوعات المغطاة</h4>
                    <ul>
                        <li>الوساطة المالية وخلق النقود</li>
                        <li>إدارة الأصول والخصوم ومخاطر السيولة</li>
                        <li>التنظيم المصرفي واتفاقيات بازل</li>
                        <li>المصرفية الاستثمارية وأسواق رؤوس الأموال</li>
                    </ul>
                </div>
            `
        }
    },
    'financial-accounting': {
        title: {
            fr: 'Comptabilité Financière',
            en: 'Financial Accounting',
            ar: 'المحاسبة المالية'
        },
        content: {
            fr: `
                <div class="modal-subject-content">
                    <h4>Objectifs d'apprentissage</h4>
                    <ul>
                        <li>Maîtriser les principes comptables fondamentaux</li>
                        <li>Préparer et analyser les états financiers</li>
                        <li>Comprendre les normes comptables internationales</li>
                        <li>Appliquer les techniques de consolidation</li>
                    </ul>
                    <h4>Sujets couverts</h4>
                    <ul>
                        <li>Cycle comptable et enregistrement des transactions</li>
                        <li>Bilan, compte de résultat et tableau de flux de trésorerie</li>
                        <li>Normes IFRS et US GAAP</li>
                        <li>Comptabilisation des instruments financiers</li>
                    </ul>
                </div>
            `,
            en: `
                <div class="modal-subject-content">
                    <h4>Learning Objectives</h4>
                    <ul>
                        <li>Master fundamental accounting principles</li>
                        <li>Prepare and analyze financial statements</li>
                        <li>Understand international accounting standards</li>
                        <li>Apply consolidation techniques</li>
                    </ul>
                    <h4>Topics Covered</h4>
                    <ul>
                        <li>Accounting cycle and transaction recording</li>
                        <li>Balance sheet, income statement, and cash flow statement</li>
                        <li>IFRS and US GAAP standards</li>
                        <li>Financial instruments accounting</li>
                    </ul>
                </div>
            `,
            ar: `
                <div class="modal-subject-content">
                    <h4>أهداف التعلم</h4>
                    <ul>
                        <li>إتقان المبادئ المحاسبية الأساسية</li>
                        <li>إعداد وتحليل البيانات المالية</li>
                        <li>فهم معايير المحاسبة الدولية</li>
                        <li>تطبيق تقنيات التوحيد</li>
                    </ul>
                    <h4>الموضوعات المغطاة</h4>
                    <ul>
                        <li>الدورة المحاسبية وتسجيل المعاملات</li>
                        <li>الميزانية العمومية وبيان الدخل وبيان التدفق النقدي</li>
                        <li>معايير IFRS و US GAAP</li>
                        <li>محاسبة الأدوات المالية</li>
                    </ul>
                </div>
            `
        }
    },
    'management-accounting': {
        title: {
            fr: 'Comptabilité de Gestion',
            en: 'Management Accounting',
            ar: 'محاسبة إدارية'
        },
        content: {
            fr: `
                <div class="modal-subject-content">
                    <h4>Objectifs d'apprentissage</h4>
                    <ul>
                        <li>Comprendre les systèmes de coûts et leur application</li>
                        <li>Maîtriser les techniques de budgétisation et contrôle</li>
                        <li>Analyser la performance et les écarts</li>
                        <li>Prendre des décisions basées sur l'information comptable</li>
                    </ul>
                    <h4>Sujets couverts</h4>
                    <ul>
                        <li>Comptabilité analytique et calcul des coûts</li>
                        <li>Budgets et contrôle budgétaire</li>
                        <li>Tableaux de bord et indicateurs de performance</li>
                        <li>Analyse coût-volume-profit</li>
                    </ul>
                </div>
            `,
            en: `
                <div class="modal-subject-content">
                    <h4>Learning Objectives</h4>
                    <ul>
                        <li>Understand cost systems and their application</li>
                        <li>Master budgeting and control techniques</li>
                        <li>Analyze performance and variances</li>
                        <li>Make decisions based on accounting information</li>
                    </ul>
                    <h4>Topics Covered</h4>
                    <ul>
                        <li>Cost accounting and cost calculation</li>
                        <li>Budgets and budgetary control</li>
                        <li>Dashboards and performance indicators</li>
                        <li>Cost-volume-profit analysis</li>
                    </ul>
                </div>
            `,
            ar: `
                <div class="modal-subject-content">
                    <h4>أهداف التعلم</h4>
                    <ul>
                        <li>فهم أنظمة التكاليف وتطبيقها</li>
                        <li>إتقان تقنيات الميزانية والرقابة</li>
                        <li>تحليل الأداء والانحرافات</li>
                        <li>اتخاذ القرارات بناءً على المعلومات المحاسبية</li>
                    </ul>
                    <h4>الموضوعات المغطاة</h4>
                    <ul>
                        <li>المحاسبة التحليلية وحساب التكاليف</li>
                        <li>الميزانيات والرقابة على الميزانية</li>
                        <li>لوحات المعلومات ومؤشرات الأداء</li>
                        <li>تحليل التكلفة-الحجم-الربح</li>
                    </ul>
                </div>
            `
        }
    },
    'tax-accounting': {
        title: {
            fr: 'Comptabilité Fiscale',
            en: 'Tax Accounting',
            ar: 'المحاسبة الضريبية'
        },
        content: {
            fr: `
                <div class="modal-subject-content">
                    <h4>Objectifs d'apprentissage</h4>
                    <ul>
                        <li>Comprendre le système fiscal et ses implications</li>
                        <li>Maîtriser le calcul et la déclaration des impôts</li>
                        <li>Optimiser la charge fiscale légalement</li>
                        <li>Gérer les contrôles fiscaux et contentieux</li>
                    </ul>
                    <h4>Sujets couverts</h4>
                    <ul>
                        <li>Impôt sur les sociétés et TVA</li>
                        <li>Fiscalité des particuliers et des entreprises</li>
                        <li>Planification fiscale et optimisation</li>
                        <li>Procédures fiscales et contentieux</li>
                    </ul>
                </div>
            `,
            en: `
                <div class="modal-subject-content">
                    <h4>Learning Objectives</h4>
                    <ul>
                        <li>Understand the tax system and its implications</li>
                        <li>Master tax calculation and filing</li>
                        <li>Optimize tax burden legally</li>
                        <li>Manage tax audits and disputes</li>
                    </ul>
                    <h4>Topics Covered</h4>
                    <ul>
                        <li>Corporate tax and VAT</li>
                        <li>Individual and business taxation</li>
                        <li>Tax planning and optimization</li>
                        <li>Tax procedures and disputes</li>
                    </ul>
                </div>
            `,
            ar: `
                <div class="modal-subject-content">
                    <h4>أهداف التعلم</h4>
                    <ul>
                        <li>فهم النظام الضريبي وآثاره</li>
                        <li>إتقان حساب وتقديم الضرائب</li>
                        <li>تحسين العبء الضريبي قانونياً</li>
                        <li>إدارة المراجعات الضريبية والنزاعات</li>
                    </ul>
                    <h4>الموضوعات المغطاة</h4>
                    <ul>
                        <li>ضريبة الشركات وضريبة القيمة المضافة</li>
                        <li>ضرائب الأفراد والشركات</li>
                        <li>التخطيط الضريبي والتحسين</li>
                        <li>الإجراءات الضريبية والنزاعات</li>
                    </ul>
                </div>
            `
        }
    },
    'financial-analysis': {
        title: {
            fr: 'Analyse Financière',
            en: 'Financial Analysis',
            ar: 'التحليل المالي'
        },
        content: {
            fr: `
                <div class="modal-subject-content">
                    <h4>Objectifs d'apprentissage</h4>
                    <ul>
                        <li>Maîtriser les techniques d'analyse financière</li>
                        <li>Interpréter les ratios et indicateurs financiers</li>
                        <li>Évaluer la performance et la santé financière</li>
                        <li>Construire des modèles financiers prévisionnels</li>
                    </ul>
                    <h4>Sujets couverts</h4>
                    <ul>
                        <li>Analyse des ratios de liquidité, rentabilité et solvabilité</li>
                        <li>Analyse horizontale et verticale des états financiers</li>
                        <li>Modélisation financière et prévisions</li>
                        <li>Évaluation d'entreprise et méthodes de valorisation</li>
                    </ul>
                </div>
            `,
            en: `
                <div class="modal-subject-content">
                    <h4>Learning Objectives</h4>
                    <ul>
                        <li>Master financial analysis techniques</li>
                        <li>Interpret financial ratios and indicators</li>
                        <li>Evaluate performance and financial health</li>
                        <li>Build financial forecasting models</li>
                    </ul>
                    <h4>Topics Covered</h4>
                    <ul>
                        <li>Analysis of liquidity, profitability, and solvency ratios</li>
                        <li>Horizontal and vertical analysis of financial statements</li>
                        <li>Financial modeling and forecasting</li>
                        <li>Business valuation and valuation methods</li>
                    </ul>
                </div>
            `,
            ar: `
                <div class="modal-subject-content">
                    <h4>أهداف التعلم</h4>
                    <ul>
                        <li>إتقان تقنيات التحليل المالي</li>
                        <li>تفسير النسب والمؤشرات المالية</li>
                        <li>تقييم الأداء والصحة المالية</li>
                        <li>بناء نماذج التنبؤ المالي</li>
                    </ul>
                    <h4>الموضوعات المغطاة</h4>
                    <ul>
                        <li>تحليل نسب السيولة والربحية والملاءة</li>
                        <li>التحليل الأفقي والعمودي للبيانات المالية</li>
                        <li>النمذجة المالية والتنبؤات</li>
                        <li>تقييم الشركات وطرق التقييم</li>
                    </ul>
                </div>
            `
        }
    },
    'risk-analysis': {
        title: {
            fr: 'Analyse des Risques',
            en: 'Risk Analysis',
            ar: 'تحليل المخاطر'
        },
        content: {
            fr: `
                <div class="modal-subject-content">
                    <h4>Objectifs d'apprentissage</h4>
                    <ul>
                        <li>Identifier et évaluer les différents types de risques</li>
                        <li>Développer des stratégies de gestion des risques</li>
                        <li>Utiliser les outils de mesure et de contrôle des risques</li>
                        <li>Comprendre la réglementation et la conformité</li>
                    </ul>
                    <h4>Sujets couverts</h4>
                    <ul>
                        <li>Risque de crédit, de marché et opérationnel</li>
                        <li>Value at Risk (VaR) et stress testing</li>
                        <li>Instruments de couverture et dérivés</li>
                        <li>Gouvernance et culture du risque</li>
                    </ul>
                </div>
            `,
            en: `
                <div class="modal-subject-content">
                    <h4>Learning Objectives</h4>
                    <ul>
                        <li>Identify and assess different types of risks</li>
                        <li>Develop risk management strategies</li>
                        <li>Use risk measurement and control tools</li>
                        <li>Understand regulation and compliance</li>
                    </ul>
                    <h4>Topics Covered</h4>
                    <ul>
                        <li>Credit, market, and operational risk</li>
                        <li>Value at Risk (VaR) and stress testing</li>
                        <li>Hedging instruments and derivatives</li>
                        <li>Risk governance and culture</li>
                    </ul>
                </div>
            `,
            ar: `
                <div class="modal-subject-content">
                    <h4>أهداف التعلم</h4>
                    <ul>
                        <li>تحديد وتقييم أنواع المخاطر المختلفة</li>
                        <li>تطوير استراتيجيات إدارة المخاطر</li>
                        <li>استخدام أدوات قياس ومراقبة المخاطر</li>
                        <li>فهم التنظيم والامتثال</li>
                    </ul>
                    <h4>الموضوعات المغطاة</h4>
                    <ul>
                        <li>مخاطر الائتمان والسوق والتشغيل</li>
                        <li>القيمة المعرضة للخطر (VaR) واختبار الضغط</li>
                        <li>أدوات التحوط والمشتقات</li>
                        <li>حوكمة وثقافة المخاطر</li>
                    </ul>
                </div>
            `
        }
    },
    'market-analysis': {
        title: {
            fr: 'Analyse de Marché',
            en: 'Market Analysis',
            ar: 'تحليل السوق'
        },
        content: {
            fr: `
                <div class="modal-subject-content">
                    <h4>Objectifs d'apprentissage</h4>
                    <ul>
                        <li>Comprendre le fonctionnement des marchés financiers</li>
                        <li>Analyser les tendances et cycles économiques</li>
                        <li>Évaluer les opportunités d'investissement</li>
                        <li>Développer des stratégies de trading et d'investissement</li>
                    </ul>
                    <h4>Sujets couverts</h4>
                    <ul>
                        <li>Analyse macroéconomique et microéconomique</li>
                        <li>Étude sectorielle et analyse concurrentielle</li>
                        <li>Indicateurs économiques et leur interprétation</li>
                        <li>Psychologie des marchés et comportement des investisseurs</li>
                    </ul>
                </div>
            `,
            en: `
                <div class="modal-subject-content">
                    <h4>Learning Objectives</h4>
                    <ul>
                        <li>Understand how financial markets work</li>
                        <li>Analyze trends and economic cycles</li>
                        <li>Evaluate investment opportunities</li>
                        <li>Develop trading and investment strategies</li>
                    </ul>
                    <h4>Topics Covered</h4>
                    <ul>
                        <li>Macroeconomic and microeconomic analysis</li>
                        <li>Sector studies and competitive analysis</li>
                        <li>Economic indicators and their interpretation</li>
                        <li>Market psychology and investor behavior</li>
                    </ul>
                </div>
            `,
            ar: `
                <div class="modal-subject-content">
                    <h4>أهداف التعلم</h4>
                    <ul>
                        <li>فهم كيفية عمل الأسواق المالية</li>
                        <li>تحليل الاتجاهات والدورات الاقتصادية</li>
                        <li>تقييم الفرص الاستثمارية</li>
                        <li>تطوير استراتيجيات التداول والاستثمار</li>
                    </ul>
                    <h4>الموضوعات المغطاة</h4>
                    <ul>
                        <li>التحليل الاقتصادي الكلي والجزئي</li>
                        <li>الدراسات القطاعية والتحليل التنافسي</li>
                        <li>المؤشرات الاقتصادية وتفسيرها</li>
                        <li>علم نفس الأسواق وسلوك المستثمرين</li>
                    </ul>
                </div>
            `
        }
    },
    'career-coaching': {
        title: {
            fr: 'Coaching Carrière',
            en: 'Career Coaching',
            ar: 'التدريب المهني'
        },
        content: {
            fr: `
                <div class="modal-subject-content">
                    <h4>Objectifs d'apprentissage</h4>
                    <ul>
                        <li>Développer un plan de carrière personnalisé</li>
                        <li>Améliorer les compétences en entretien d'embauche</li>
                        <li>Optimiser le CV et la lettre de motivation</li>
                        <li>Développer les compétences professionnelles</li>
                    </ul>
                    <h4>Sujets couverts</h4>
                    <ul>
                        <li>Évaluation des compétences et des intérêts</li>
                        <li>Stratégies de recherche d'emploi</li>
                        <li>Techniques d'entretien et négociation salariale</li>
                        <li>Développement du leadership et communication</li>
                    </ul>
                </div>
            `,
            en: `
                <div class="modal-subject-content">
                    <h4>Learning Objectives</h4>
                    <ul>
                        <li>Develop a personalized career plan</li>
                        <li>Improve job interview skills</li>
                        <li>Optimize resume and cover letter</li>
                        <li>Develop professional skills</li>
                    </ul>
                    <h4>Topics Covered</h4>
                    <ul>
                        <li>Skills and interests assessment</li>
                        <li>Job search strategies</li>
                        <li>Interview techniques and salary negotiation</li>
                        <li>Leadership development and communication</li>
                    </ul>
                </div>
            `,
            ar: `
                <div class="modal-subject-content">
                    <h4>أهداف التعلم</h4>
                    <ul>
                        <li>تطوير خطة مهنية شخصية</li>
                        <li>تحسين مهارات المقابلة الوظيفية</li>
                        <li>تحسين السيرة الذاتية وخطاب التغطية</li>
                        <li>تطوير المهارات المهنية</li>
                    </ul>
                    <h4>الموضوعات المغطاة</h4>
                    <ul>
                        <li>تقييم المهارات والاهتمامات</li>
                        <li>استراتيجيات البحث عن عمل</li>
                        <li>تقنيات المقابلة والتفاوض على الراتب</li>
                        <li>تطوير القيادة والتواصل</li>
                    </ul>
                </div>
            `
        }
    },
    'exam-preparation': {
        title: {
            fr: 'Préparation aux Examens',
            en: 'Exam Preparation',
            ar: 'إعداد الامتحانات'
        },
        content: {
            fr: `
                <div class="modal-subject-content">
                    <h4>Objectifs d'apprentissage</h4>
                    <ul>
                        <li>Maîtriser les stratégies d'étude efficaces</li>
                        <li>Se préparer aux examens professionnels (CPA, CFA, ACCA)</li>
                        <li>Développer des techniques de gestion du stress</li>
                        <li>Optimiser les performances aux examens</li>
                    </ul>
                    <h4>Sujets couverts</h4>
                    <ul>
                        <li>Planification et organisation des révisions</li>
                        <li>Techniques de mémorisation et de compréhension</li>
                        <li>Simulation d'examens et correction</li>
                        <li>Gestion du temps et du stress</li>
                    </ul>
                </div>
            `,
            en: `
                <div class="modal-subject-content">
                    <h4>Learning Objectives</h4>
                    <ul>
                        <li>Master effective study strategies</li>
                        <li>Prepare for professional exams (CPA, CFA, ACCA)</li>
                        <li>Develop stress management techniques</li>
                        <li>Optimize exam performance</li>
                    </ul>
                    <h4>Topics Covered</h4>
                    <ul>
                        <li>Revision planning and organization</li>
                        <li>Memorization and comprehension techniques</li>
                        <li>Exam simulation and correction</li>
                        <li>Time and stress management</li>
                    </ul>
                </div>
            `,
            ar: `
                <div class="modal-subject-content">
                    <h4>أهداف التعلم</h4>
                    <ul>
                        <li>إتقان استراتيجيات الدراسة الفعالة</li>
                        <li>التحضير للامتحانات المهنية (CPA، CFA، ACCA)</li>
                        <li>تطوير تقنيات إدارة الضغط</li>
                        <li>تحسين الأداء في الامتحانات</li>
                    </ul>
                    <h4>الموضوعات المغطاة</h4>
                    <ul>
                        <li>تخطيط وتنظيم المراجعات</li>
                        <li>تقنيات الحفظ والفهم</li>
                        <li>محاكاة الامتحانات والتصحيح</li>
                        <li>إدارة الوقت والضغط</li>
                    </ul>
                </div>
            `
        }
    },
    'academic-support': {
        title: {
            fr: 'Soutien Académique',
            en: 'Academic Support',
            ar: 'الدعم الأكاديمي'
        },
        content: {
            fr: `
                <div class="modal-subject-content">
                    <h4>Objectifs d'apprentissage</h4>
                    <ul>
                        <li>Accompagner la rédaction de mémoires et thèses</li>
                        <li>Maîtriser la méthodologie de recherche</li>
                        <li>Développer les compétences en rédaction académique</li>
                        <li>Structurer et présenter les travaux de recherche</li>
                    </ul>
                    <h4>Sujets couverts</h4>
                    <ul>
                        <li>Choix et formulation du sujet de recherche</li>
                        <li>Revue de littérature et sources académiques</li>
                        <li>Méthodologie quantitative et qualitative</li>
                        <li>Rédaction, citation et présentation</li>
                    </ul>
                </div>
            `,
            en: `
                <div class="modal-subject-content">
                    <h4>Learning Objectives</h4>
                    <ul>
                        <li>Support thesis and dissertation writing</li>
                        <li>Master research methodology</li>
                        <li>Develop academic writing skills</li>
                        <li>Structure and present research work</li>
                    </ul>
                    <h4>Topics Covered</h4>
                    <ul>
                        <li>Research topic selection and formulation</li>
                        <li>Literature review and academic sources</li>
                        <li>Quantitative and qualitative methodology</li>
                        <li>Writing, citation, and presentation</li>
                    </ul>
                </div>
            `,
            ar: `
                <div class="modal-subject-content">
                    <h4>أهداف التعلم</h4>
                    <ul>
                        <li>دعم كتابة الأطروحات والرسائل</li>
                        <li>إتقان منهجية البحث</li>
                        <li>تطوير مهارات الكتابة الأكاديمية</li>
                        <li>هيكلة وعرض أعمال البحث</li>
                    </ul>
                    <h4>الموضوعات المغطاة</h4>
                    <ul>
                        <li>اختيار وصياغة موضوع البحث</li>
                        <li>مراجعة الأدبيات والمصادر الأكاديمية</li>
                        <li>المنهجية الكمية والنوعية</li>
                        <li>الكتابة والاستشهاد والعرض</li>
                    </ul>
                </div>
            `
        }
    }
};

// === FORM STATE MANAGEMENT ===
let formStateSnapshot = new Map();

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 OOUI PROF - Initializing...');
    
    // Store original French texts first
    storeOriginalTexts();
    
    // Initialize theme and language from localStorage
    initializeTheme();
    initializeLanguage();
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize animations
    initializeAnimations();
    
    // Initialize counters
    initializeCounters();
    
    // Initialize typewriter effect
    initializeTypewriter();
    
    // Initialize form state management
    initializeFormStateManagement();
    
    // Hide loading screen
    setTimeout(() => {
        hideLoadingScreen();
    }, 1500);
    
    console.log('✅ OOUI PROF - Initialized successfully');
});

// === STORE ORIGINAL FRENCH TEXTS ===
function storeOriginalTexts() {
    const translatableElements = document.querySelectorAll('[data-en], [data-ar]');
    
    translatableElements.forEach((element, index) => {
        const originalText = element.textContent.trim();
        const elementId = element.id || `translatable-${index}`;
        
        // Store the original French text
        originalFrenchTexts.set(elementId, originalText);
        
        // Add an ID if the element doesn't have one for future reference
        if (!element.id) {
            element.id = elementId;
        }
    });
    
    console.log('📝 Stored original French texts for', originalFrenchTexts.size, 'elements');
}

// === FORM STATE MANAGEMENT ===
function initializeFormStateManagement() {
    const form = document.getElementById('appointment-form');
    if (!form) return;
    
    // Store initial form state
    captureFormState();
    
    // Add event listeners to form elements to track changes
    const formElements = form.querySelectorAll('input, select, textarea');
    formElements.forEach(element => {
        element.addEventListener('input', captureFormState);
        element.addEventListener('change', captureFormState);
    });
    
    console.log('📋 Form state management initialized');
}

function captureFormState() {
    const form = document.getElementById('appointment-form');
    if (!form) return;
    
    const formData = new FormData(form);
    const state = {};
    
    // Capture all form values
    for (let [key, value] of formData.entries()) {
        state[key] = value;
    }
    
    // Store in our state snapshot
    formStateSnapshot.set('currentValues', state);
    
    // Also store individual element states
    const formElements = form.querySelectorAll('input, select, textarea');
    formElements.forEach(element => {
        const elementState = {
            value: element.value,
            checked: element.checked,
            selectedIndex: element.selectedIndex
        };
        formStateSnapshot.set(element.name || element.id, elementState);
    });
}

function restoreFormState() {
    const form = document.getElementById('appointment-form');
    if (!form) return;
    
    const formElements = form.querySelectorAll('input, select, textarea');
    formElements.forEach(element => {
        const elementKey = element.name || element.id;
        const savedState = formStateSnapshot.get(elementKey);
        
        if (savedState) {
            if (element.type === 'checkbox' || element.type === 'radio') {
                element.checked = savedState.checked || false;
            } else if (element.tagName === 'SELECT') {
                if (savedState.selectedIndex !== undefined) {
                    element.selectedIndex = savedState.selectedIndex;
                }
            } else {
                element.value = savedState.value || '';
            }
        }
    });
    
    console.log('📋 Form state restored');
}

// === PACK SELECTION FUNCTION ===
function selectPack(packType) {
    console.log('📦 Pack selected:', packType);
    
    // Pre-select the pack in the appointment form
    const packSelect = document.getElementById('pack');
    if (packSelect) {
        packSelect.value = packType;
        
        // Trigger change event to update form state
        const changeEvent = new Event('change', { bubbles: true });
        packSelect.dispatchEvent(changeEvent);
        
        // Add visual feedback
        packSelect.classList.add('form-highlight');
        setTimeout(() => {
            packSelect.classList.remove('form-highlight');
        }, 2000);
    }
    
    // Scroll to appointment section
    setTimeout(() => {
        scrollToSection('appointment');
    }, 300);
    
    // Show a brief confirmation message
    showPackSelectionFeedback(packType);
}

function showPackSelectionFeedback(packType) {
    // Create feedback element if it doesn't exist
    let feedback = document.getElementById('pack-selection-feedback');
    if (!feedback) {
        feedback = document.createElement('div');
        feedback.id = 'pack-selection-feedback';
        feedback.className = 'pack-selection-feedback';
        document.body.appendChild(feedback);
    }
    
    // Set feedback message based on current language
    const messages = {
        fr: {
            flex: 'Pack Flex sélectionné ! Faites défiler vers le bas pour réserver.',
            starter: 'Pack Starter sélectionné ! Faites défiler vers le bas pour réserver.',
            progress: 'Pack Progress sélectionné ! Faites défiler vers le bas pour réserver.'
        },
        en: {
            flex: 'Flex Pack selected! Scroll down to book.',
            starter: 'Starter Pack selected! Scroll down to book.',
            progress: 'Progress Pack selected! Scroll down to book.'
        },
        ar: {
            flex: 'تم اختيار باقة مرنة! مرر لأسفل للحجز.',
            starter: 'تم اختيار باقة البداية! مرر لأسفل للحجز.',
            progress: 'تم اختيار باقة التقدم! مرر لأسفل للحجز.'
        }
    };
    
    const message = messages[currentLanguage]?.[packType] || messages.fr[packType];
    feedback.innerHTML = `
        <div class="feedback-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Show feedback
    feedback.classList.add('show');
    
    // Hide feedback after 3 seconds
    setTimeout(() => {
        feedback.classList.remove('show');
    }, 3000);
}

// === THEME MANAGEMENT ===
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    currentTheme = savedTheme;
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
    
    // Add smooth transition effect
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 300);
}

function updateThemeIcon() {
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    
    if (sunIcon && moonIcon) {
        if (currentTheme === 'dark') {
            sunIcon.style.opacity = '0';
            moonIcon.style.opacity = '1';
        } else {
            sunIcon.style.opacity = '1';
            moonIcon.style.opacity = '0';
        }
    }
}

// === LANGUAGE MANAGEMENT ===
function initializeLanguage() {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    currentLanguage = savedLanguage;
    changeLanguage(currentLanguage);
}

function changeLanguage(lang) {
    if (!['fr', 'en', 'ar'].includes(lang)) {
        console.error('Language not supported:', lang);
        return;
    }
    
    console.log(`🌐 Changing language from ${currentLanguage} to ${lang}`);
    
    // Capture form state before language change
    captureFormState();
    
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // Update HTML attributes
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Update language button text
    const langText = document.querySelector('.lang-text');
    if (langText) {
        langText.textContent = lang.toUpperCase();
    }
    
    // Update all translatable elements
    updateTranslations();
    
    // Update form placeholders (but preserve form values)
    updateFormPlaceholders();
    
    // Restore form state after language change
    restoreFormState();
    
    // Update typewriter effect
    updateTypewriterText();
    
    // Update select options
    updateSelectOptions();
    
    // Close language dropdown
    const dropdown = document.getElementById('language-dropdown');
    if (dropdown) {
        dropdown.classList.remove('show');
    }
    
    console.log('✅ Language changed to:', lang);
}

function updateTranslations() {
    const elements = document.querySelectorAll('[data-en], [data-ar]');
    
    elements.forEach(element => {
        const elementId = element.id;
        let newText = '';
        
        if (currentLanguage === 'fr') {
            // Restore original French text
            newText = originalFrenchTexts.get(elementId);
        } else if (currentLanguage === 'en' && element.dataset.en) {
            newText = element.dataset.en;
        } else if (currentLanguage === 'ar' && element.dataset.ar) {
            newText = element.dataset.ar;
        }
        
        // Only update if we have text and it's different from current
        if (newText && newText !== element.textContent) {
            element.textContent = newText;
        }
    });
}

function updateSelectOptions() {
    // Update select option text while preserving selected values
    const selects = document.querySelectorAll('select');
    
    selects.forEach(select => {
        const currentValue = select.value; // Preserve current selection
        
        const options = select.querySelectorAll('option[data-en], option[data-ar]');
        options.forEach(option => {
            const optionId = option.id || option.value;
            let newText = '';
            
            if (currentLanguage === 'fr') {
                // Get original French text
                newText = originalFrenchTexts.get(optionId) || option.textContent;
            } else if (currentLanguage === 'en' && option.dataset.en) {
                newText = option.dataset.en;
            } else if (currentLanguage === 'ar' && option.dataset.ar) {
                newText = option.dataset.ar;
            }
            
            if (newText && newText !== option.textContent) {
                option.textContent = newText;
            }
        });
        
        // Restore the selected value
        select.value = currentValue;
    });
}

function updateFormPlaceholders() {
    const messageTextarea = document.getElementById('message');
    if (messageTextarea) {
        const placeholders = {
            fr: 'Décrivez vos besoins spécifiques...',
            en: 'Describe your specific needs...',
            ar: 'صف احتياجاتك المحددة...'
        };
        messageTextarea.placeholder = placeholders[currentLanguage] || placeholders.fr;
    }
}

// === TYPEWRITER EFFECT ===
function initializeTypewriter() {
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        updateTypewriterText();
    }
}

function updateTypewriterText() {
    const typewriterElement = document.querySelector('.typewriter');
    if (!typewriterElement) return;
    
    const texts = {
        fr: 'Comptabilité',
        en: 'Accounting',
        ar: 'المحاسبة'
    };
    
    const newText = texts[currentLanguage] || texts.fr;
    
    // Only update if text has changed
    if (typewriterElement.textContent !== newText) {
        // Reset animation
        typewriterElement.style.animation = 'none';
        typewriterElement.textContent = newText;
        
        // Restart animation
        setTimeout(() => {
            typewriterElement.style.animation = 'typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite';
        }, 10);
    }
}

// === EVENT LISTENERS ===
function setupEventListeners() {
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Language selector
    const languageBtn = document.getElementById('language-btn');
    const languageDropdown = document.getElementById('language-dropdown');
    
    if (languageBtn && languageDropdown) {
        languageBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            languageDropdown.classList.toggle('show');
        });
        
        // Language options
        const languageOptions = document.querySelectorAll('.language-option');
        languageOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = option.dataset.lang;
                if (lang && lang !== currentLanguage) {
                    changeLanguage(lang);
                }
            });
        });
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (languageDropdown && !languageDropdown.contains(e.target) && !languageBtn.contains(e.target)) {
            languageDropdown.classList.remove('show');
        }
    });
    
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('show');
        });
    }
    
    // Navigation links
    const navLinksElements = document.querySelectorAll('.nav-link');
    navLinksElements.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
            
            // Close mobile menu
            if (navLinks) navLinks.classList.remove('show');
            if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
            
            // Update active nav link
            updateActiveNavLink(link);
        });
    });
    
    // Subject tabs
    const subjectTabs = document.querySelectorAll('.subject-tab');
    subjectTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const subject = tab.dataset.subject;
            switchSubjectTab(subject);
        });
    });
    
    // Scroll events
    window.addEventListener('scroll', handleScroll);
    
    // Resize events
    window.addEventListener('resize', handleResize);
    
    console.log('📝 Event listeners setup complete');
}

// === ANIMATIONS ===
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .subject-card, .achievement-item, .contact-item');
    animateElements.forEach(el => {
        animationObserver.observe(el);
    });
}

function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.count);
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, stepTime);
}

// === SCROLL HANDLING ===
function handleScroll() {
    const header = document.getElementById('header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Header scroll effect
    if (scrollTop > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Update active navigation based on scroll position
    updateActiveNavOnScroll();
    
    scrollPosition = scrollTop;
}

function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

function updateActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.getElementById('header').offsetHeight;
        const targetPosition = section.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// === RESIZE HANDLING ===
function handleResize() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        const navLinks = document.getElementById('nav-links');
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        
        if (navLinks) navLinks.classList.remove('show');
        if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
    }
}

// === SUBJECT TABS ===
function switchSubjectTab(subject) {
    // Update tab buttons
    const tabs = document.querySelectorAll('.subject-tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.subject === subject) {
            tab.classList.add('active');
        }
    });
    
    // Update panels
    const panels = document.querySelectorAll('.subject-panel');
    panels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === `${subject}-panel`) {
            panel.classList.add('active');
        }
    });
}

// === SUBJECT MODAL ===
function openSubjectModal(subjectId) {
    const modal = document.getElementById('subject-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    
    if (!modal || !modalTitle || !modalContent) {
        console.error('Modal elements not found');
        return;
    }
    
    const subjectData = subjectModalData[subjectId];
    if (!subjectData) {
        console.error('Subject data not found for:', subjectId);
        return;
    }
    
    // Set modal content
    modalTitle.textContent = subjectData.title[currentLanguage] || subjectData.title.fr;
    modalContent.innerHTML = subjectData.content[currentLanguage] || subjectData.content.fr;
    
    // Show modal
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeSubjectModal() {
    const modal = document.getElementById('subject-modal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// === LOADING SCREEN ===
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
    isLoading = false;
}

// === FORM HANDLING ===
function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    const loadingTexts = {
        fr: '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...',
        en: '<i class="fas fa-spinner fa-spin"></i> Sending...',
        ar: '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...'
    };
    
    submitBtn.innerHTML = loadingTexts[currentLanguage] || loadingTexts.fr;
    submitBtn.disabled = true;
    
    // Get form data
    const formData = new FormData(form);
    const data = {};
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // Add metadata
    data.timestamp = new Date().toISOString();
    data.language = currentLanguage;
    data.userAgent = navigator.userAgent;
    
    // Simulate form submission (replace with actual submission logic)
    setTimeout(() => {
        // Show success message
        showSuccessMessage();
        
        // Reset form
        form.reset();
        formStateSnapshot.clear(); // Clear saved form state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        console.log('📧 Form submitted:', data);
    }, 2000);
}

function showSuccessMessage() {
    const successMessage = document.getElementById('success-message');
    if (successMessage) {
        successMessage.classList.add('show');
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
        
        // Allow manual close by clicking outside
        successMessage.addEventListener('click', (e) => {
            if (e.target === successMessage) {
                successMessage.classList.remove('show');
            }
        });
    }
}

// === UTILITY FUNCTIONS ===
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// === PERFORMANCE OPTIMIZATIONS ===
// Optimize scroll handler
const optimizedScrollHandler = throttle(handleScroll, 16);
window.addEventListener('scroll', optimizedScrollHandler);

// Optimize resize handler
const optimizedResizeHandler = debounce(handleResize, 250);
window.addEventListener('resize', optimizedResizeHandler);

// === ACCESSIBILITY ===
// Keyboard navigation for modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeSubjectModal();
        
        const successMessage = document.getElementById('success-message');
        if (successMessage && successMessage.classList.contains('show')) {
            successMessage.classList.remove('show');
        }
    }
});

// Focus management for mobile menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        const navLinks = document.getElementById('nav-links');
        if (navLinks && navLinks.classList.contains('show')) {
            const focusableElements = navLinks.querySelectorAll('a');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }
});

// === GLOBAL FUNCTIONS (for backward compatibility) ===
window.toggleTheme = toggleTheme;
window.changeLanguage = changeLanguage;
window.scrollToSection = scrollToSection;
window.openSubjectModal = openSubjectModal;
window.closeSubjectModal = closeSubjectModal;
window.handleSubmit = handleSubmit;
window.selectPack = selectPack;

// === ERROR HANDLING ===
window.addEventListener('error', (e) => {
    console.error('🚨 JavaScript Error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('🚨 Unhandled Promise Rejection:', e.reason);
});

console.log('🎉 OOUI PROF - Script loaded successfully');