# Project Setup and Usage

## Prerequisites

- **SUMO Backend**: Ensure the SUMO backend is up and running on **localhost:5000**.
- **Robotaxi GPT Backend**: Ensure the Robotaxi GPT backend is running on **localhost:5001**.

## Running the Frontend

1. Open a terminal or command prompt.
2. Navigate to the frontend project directory.
3. Run the following command:

   ```bash
   npm run dev
   ```

4. Once the server starts, open your web browser and go to: [http://localhost:3000](http://localhost:3000)

If everything is configured correctly, you should be able to interact with the application through the web interface.

## Project Structure
my-app/
├── app/
│   ├── (dashboard)/
│   │   ├── (pages)/
│   │   │   ├── analytics/                                  # Analytics components
│   │   │   ├── dashboard/
│   │   │   │   ├── dashboard-card-charger.tsx              # Component for active charger card
│   │   │   │   ├── dashboard-card-cost.tsx                 # Component for cost card
│   │   │   │   ├── dashboard-card-elec.tsx                 # Component for electricity consumption card
│   │   │   │   ├── dashboard-card-passenger.tsx            # Component for active passengers card
│   │   │   │   ├── dashboard-card-profit.tsx               # Component for profit card
│   │   │   │   ├── dashboard-card-revenue.tsx              # Component for revenue card
│   │   │   │   ├── dashboard-card-vehicle.tsx              # Component for active robotaxis card
│   │   │   │   └── page.tsx                                # Main dashboard page
│   │   │   ├── map/                                        # Map page component
│   │   │   ├── optimization/                               # Optimization comparison component
│   │   │   ├── gpt/                                        # Robotaxi GPT component 
│   │   │   ├── parameters/                                 # Dynamic parameter change component 
│   │   ├── (help)/
│   │   │   └── contact/                                    # contact component
│   │   │   └── documentation/                              # documentation component 
│   │   │   └── faqs/                                       # faqs component
│   │   ├── layout.tsx                                      # Layout component for dashboard
│   ├── (landing)/
│   │   ├── initialization/
│   │   │   └── layout.tsx                                  # Layout for Initialization page component
│   │   │   └── page.tsx                                    # Initialization page component
│   │   ├── layout.tsx                                      # Layout for landing page component
│   │   └── page.tsx                                        # Landing page component
│   ├── css/
│   │   ├── additional-styles/
│   │   │   ├── custom-fonts.css                            # Custom fonts styles
│   │   │   ├── flatpickr.css                               # Styles for flatpickr date picker
│   │   │   ├── theme.css                                   # Theme-related styles
│   │   │   └── utility-patterns.css                        # Utility CSS patterns
│   │   └── style.css                                       # Main stylesheet importing all styles
│   ├── layout.tsx                                          # Root layout component
│   ├── page.tsx                                            # Main application entry point
│   └── theme-provider.tsx                                  # Theme provider for application
├── components/
│   ├── charts/
│   │   ├── chartjs-config.ts                               # Configuration for Chart.js
│   │   ├── doughnut-chart.tsx                              # Doughnut chart component
│   │   ├── line-chart-financial-metrics.tsx                # Line chart variant for financial metrics
│   │   ├── line-chart-optimization.tsx                     # Line chart variant for optimization
│   │   ├── realtime-chart-chargers.tsx                     # Real-time active chargers chart
│   │   ├── realtime-chart-elec.tsx                         # Real-time electricity usage chart
│   │   ├── realtime-chart-passengers.tsx                   # Real-time active passengers chart
│   │   └── realtime-chart-vehicles.tsx                     # Real-time ative vehicles chart
│   ├── dashboard-page-components/
│   │   ├── map.tsx                                         # Map component
│   │   ├── sidebar.tsx                                     # Sidebar component 
│   │   └── sidebar-link.tsx                                # Sidebar link component 
│   ├── landing-page-components/
│   │   ├── background.tsx                                  # Background component for landing page
│   │   ├── features.tsx                                    # Features section component for landing page
│   │   ├── footer.tsx                                      # Footer component for landing page
│   │   ├── join-us.tsx                                     # Join us section component for landing page
│   │   ├── title.tsx                                       # Title component for landing page
│   │   └── video.tsx                                       # Video component for landing page
│   ├── utils/
│   │   └── utils.ts                                        # Utility functions
│   └── tooltip.tsx                                         # Tooltip component for more info
│  
├── public/
│   ├── fonts/
│   │   ├── nacelle-italic.woff2                            # Nacelle font italic variant
│   │   ├── nacelle-regular.woff2                           # Nacelle font regular variant
│   │   ├── nacelle-semibold.woff2                          # Nacelle font semibold variant
│   │   └── nacelle-semibolditalic.woff2                    # Nacelle font semibold italic variant
│   ├── images/
│   │   └── landing-page-video-img.jpg                      # Video thumbnail image
│   ├── videos/
│   │   └── robotaxi.mp4                                    # Video file for landing page
│   └── doc/                  
│       └── final-report.pdf                                # Final project report
├── test/
│   ├── test-dashboard.js                                   # Scalibility test for the dashboard
├── .gitignore                                              # Git ignore configuration
├── next.config.js                                          # Next.js configuration
├── package.json                                            # Project dependencies and scripts
├── postcss.config.js                                       # PostCSS configuration
├── tailwind.config.js                                      # Tailwind CSS configuration
├── tsconfig.json                                           # TypeScript configuration