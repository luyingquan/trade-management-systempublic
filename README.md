# Trade Management System

A modern trade management system built with React and Spring Boot.

## Features

- Listing Management
- Order Management
- Contract Management
- Real-time Data Updates
- XML-based Data Storage

## Tech Stack

### Frontend
- React
- TypeScript
- Ant Design
- Vite

### Backend
- Spring Boot
- Java
- XML Data Storage

## Getting Started

### Prerequisites
- Node.js >= 16
- Java >= 17
- Maven >= 3.6

### Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
```

2. Install frontend dependencies:
```bash
cd [project-directory]
npm install
```

3. Install backend dependencies:
```bash
cd backend
mvn install
```

### Running the Application

1. Start the backend server:
```bash
cd backend
mvn spring-boot:run
```

2. Start the frontend development server:
```bash
cd [project-directory]
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
├── backend/                 # Spring Boot backend
│   ├── src/                # Source files
│   ├── pom.xml            # Maven configuration
│   └── data/              # XML data storage
├── src/                    # React frontend
│   ├── components/        # Reusable components
│   ├── pages/            # Page components
│   ├── services/         # API services
│   └── types/            # TypeScript types
└── package.json          # NPM dependencies
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
