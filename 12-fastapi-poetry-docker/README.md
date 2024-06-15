# Run on local

poetry install
poetry run uvicorn 12_fastapi_poetry_docker.main:app --host 0.0.0.0 --port 8000

Check in browser:

http://localhost:8000

# Run on Docker

docker version
docker build -f Dockerfile.dev -t my-dev-image .
docker run -d --name dev-cont1 -p 8000:8000 my-dev-image

Check in browser:

http://localhost:8000

# Run on Dev Container

go to remote explorer
open project folder

poetry install

poetry run uvicorn 12_fastapi_poetry_docker.main:app --host 0.0.0.0 --reload

Check in browser:

http://localhost:8000