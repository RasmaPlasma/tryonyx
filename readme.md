# TryOnyx - AI-Powered Virtual Try-On & Clothing Swap

A hackathon project that allows users to virtually try on clothes and swap clothing between two people using AI technology powered by Replicate's google/nano-banana model.

## Features

- **Virtual Try-On**: Upload a person's photo and a clothing item to see how it would look
- **Clothing Swap**: Upload two people's photos to swap their clothing
- **AI-Powered**: Uses Replicate's google/nano-banana model for realistic results
- **Cloud Storage**: Images are stored securely using Cloudinary

## Tech Stack

- **Backend**: Node.js with Express
- **AI Processing**: Replicate API (google/nano-banana model)
- **Image Storage**: Cloudinary
- **File Upload**: Multer

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- Replicate API account
- Cloudinary account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tryonyx/backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
```
REPLICATE_API_TOKEN=your_replicate_api_token_here
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=3000
```

4. Start the server:
```bash
npm run dev
```

The server will run on `http://localhost:3000`

## API Endpoints

### Health Check
```http
GET /health
```

### Virtual Try-On
```http
POST /api/tryon
Content-Type: multipart/form-data

Fields:
- person: Image file of the person
- clothing: Image file of the clothing item
```

Response:
```json
{
  "success": true,
  "resultUrl": "https://...",
  "message": "Try-on completed successfully!"
}
```

### Clothing Swap
```http
POST /api/swap
Content-Type: multipart/form-data

Fields:
- person1: Image file of the first person
- person2: Image file of the second person
```

Response:
```json
{
  "success": true,
  "resultUrl": "https://...",
  "originalImages": {
    "person1": "https://...",
    "person2": "https://..."
  },
  "message": "Clothing swap completed successfully!"
}
```

## Usage Examples

### Try-On with cURL
```bash
curl -X POST http://localhost:3000/api/tryon \
  -F "person=@/path/to/person.jpg" \
  -F "clothing=@/path/to/clothing.jpg"
```

### Clothing Swap with cURL
```bash
curl -X POST http://localhost:3000/api/swap \
  -F "person1=@/path/to/person1.jpg" \
  -F "person2=@/path/to/person2.jpg"
```

## Error Handling

The API includes comprehensive error handling for:
- Invalid file types (only images allowed)
- Missing required files
- File size limits (10MB max)
- Replicate API errors
- Cloudinary upload errors

## Development

```bash
# Start development server with auto-reload
npm run dev

# Start production server
npm start
```

## Project Structure

```
backend/
├── src/
│   ├── index.js              # Main Express server
│   ├── routes/
│   │   ├── tryon.js          # Virtual try-on endpoints
│   │   └── swap.js           # Clothing swap endpoints
│   ├── services/
│   │   └── replicateClient.js # Replicate API integration
│   └── utils/
│       └── cloudinary.js     # Image upload utilities
├── package.json
└── .env.example
```

## Contributing

This is a hackathon project. Feel free to fork and improve!

## License

MIT