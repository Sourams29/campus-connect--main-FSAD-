from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from supabase import create_client, Client
from datetime import datetime

# Load env from root
load_dotenv(dotenv_path="../.env")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Supabase
url: str = os.environ.get("VITE_SUPABASE_URL")
key: str = os.environ.get("SUPABASE_SERVICE_ROLE_KEY") or os.environ.get("VITE_SUPABASE_ANON_KEY")
supabase: Client = create_client(url, key)

@app.get("/api/python/health")
async def health():
    return {
        "status": "ok",
        "engine": "Python/FastAPI",
        "timestamp": datetime.utcnow().isoformat()
    }

@app.get("/api/python/events")
async def get_events():
    try:
        response = supabase.table("events").select("*").execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT_PYTHON", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
