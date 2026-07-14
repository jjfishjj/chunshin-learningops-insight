# Chun Shin LearningOps Insight

Prototype for a data-driven education solution tailored to Chun Shin Co., Ltd. and its education business roles:

- Learning Planning Consultant
- Language Strategy Consultant
- Data Analyst / BI support

The project reframes Chun Shin's public business context into a deployable concept system that connects campus/enterprise language projects, learner progress, TOEIC/TOEFL exam journeys, TOEIC Pal style digital learning behavior, course operations, CRM opportunities, and BI reporting.

## Demo Scope

This is a portfolio-ready static prototype, not a production integration. It uses synthetic data and public business context to show how a candidate could support:

- Campus and enterprise account development
- Language learning solution proposals
- Course scheduling and execution tracking
- Learner lifecycle and conversion analysis
- Power BI dashboard planning
- SQL-ready normalized data modeling
- Cross-business CRM and risk-monitoring ideas

## Files

- `index.html` - deployable dashboard/proposal prototype
- `styles.css` - responsive visual system
- `app.js` - mock analytics and interaction logic
- `bi-dashboard.html` - standalone BI-style analytics dashboard with upload and report export
- `bi-dashboard.css` - BI dashboard visual system
- `bi-dashboard.js` - visualization, Excel/CSV parsing, KPI, table, and decision logic
- `brand-dashboard.html` - GoPro / 法鉑 lifestyle brand analytics dashboard for proxy brand marketing and operations
- `brand-dashboard.css` - lifestyle brand BI dashboard visual system
- `brand-dashboard.js` - mock brand data, channel analysis, cross-sell, inventory, and decision logic
- `toeic-pal-report.html` - TOEIC Pal retention dashboard and learner-facing English ability report demo
- `toeic-pal-report.css` - TOEIC Pal report visual system
- `toeic-pal-report.js` - retention cohort, conversion funnel, ability persona, and learning prescription logic
- `toeic-methodology.html` - revised methodology-first demo based on the partner optimization brief
- `toeic-methodology.css` - visual system for the TOEIC learning conversion methodology demo
- `toeic-methodology.js` - validation-topic selector and readiness checklist logic
- `method-simulator-dashboard.html` - operation-style methodology simulator dashboard based on UI reference screenshots
- `method-simulator-dashboard.css` - simulator dashboard visual system
- `method-simulator-dashboard.js` - mock data, bottleneck diagnosis, charts, report summary, and manpower estimates
- `data/sample-metrics.json` - synthetic KPI data
- `data/bi-sample-dataset.csv` - sample upload dataset for the BI dashboard
- `docs/data-solution-brief.md` - proposal narrative and pain-point mapping
- `docs/interview-script.md` - 60-second interview pitch and suggested questions
- `sql/chunshin_learningops_model.sql` - BI-oriented schema, views, and data quality checks

## Demo URLs

- Main proposal: `https://jjfishjj.github.io/chunshin-learningops-insight/`
- BI dashboard: `https://jjfishjj.github.io/chunshin-learningops-insight/bi-dashboard.html`
- Lifestyle brand dashboard: `https://jjfishjj.github.io/chunshin-learningops-insight/brand-dashboard.html`
- TOEIC Pal retention and ability report: `https://jjfishjj.github.io/chunshin-learningops-insight/toeic-pal-report.html`
- TOEIC methodology: `https://jjfishjj.github.io/chunshin-learningops-insight/toeic-methodology.html`
- Method simulator dashboard: `https://jjfishjj.github.io/chunshin-learningops-insight/method-simulator-dashboard.html`

## GitHub Pages Deployment

This standalone project includes `.github/workflows/pages.yml`. After pushing to GitHub:

1. Go to repository Settings.
2. Open Pages.
3. Set source to GitHub Actions.
4. Run the workflow or push to the default branch.

The workflow publishes this folder as a static site.

## Data Note

All numbers are synthetic for interview demonstration. The design is based on public information from Chun Shin's official website and the job descriptions shared by the candidate.
