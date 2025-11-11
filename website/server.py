import os

import httpx
from fastapi import FastAPI, Request, Response
from fastapi.responses import JSONResponse, PlainTextResponse
from fastapi.staticfiles import StaticFiles

WEB_ROOT = os.environ.get("WEB_ROOT", os.path.dirname(__file__))
MCP_TARGET = os.environ.get("MCP_TARGET", "http://127.0.0.1:3001/mcp/")
ALLOWED_ORIGIN = os.environ.get("ALLOWED_ORIGIN", "*")
PORT = int(os.environ.get("PORT", "8080"))

if not MCP_TARGET.endswith("/"):
    MCP_TARGET = f"{MCP_TARGET}/"

app = FastAPI()


@app.options("/mcp/", include_in_schema=False)
async def options_mcp() -> Response:
    headers = {
        "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
        "Access-Control-Allow-Methods": "POST,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type,Accept",
        "Vary": "Origin",
    }
    return Response(status_code=204, headers=headers)


@app.post("/mcp/", include_in_schema=False)
async def proxy_mcp(request: Request):
    forward_headers = {
        "Content-Type": "application/json",
        "Accept": "application/json, text/event-stream",
    }

    payload = await request.body()

    async with httpx.AsyncClient(timeout=15.0) as client:
        try:
            resp = await client.post(
                MCP_TARGET,
                content=payload,
                headers=forward_headers,
            )
        except httpx.RequestError as exc:
            return JSONResponse(
                {"error": f"Proxy connection failed: {exc}"},
                status_code=502,
                headers={
                    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
                    "Access-Control-Allow-Methods": "POST,OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type,Accept",
                    "Vary": "Origin",
                },
            )

    response_headers = {
        "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
        "Access-Control-Allow-Methods": "POST,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type,Accept",
        "Vary": "Origin",
    }

    for key, value in resp.headers.items():
        if key.lower().startswith("content-"):
            response_headers[key] = value

    if resp.headers.get("Content-Type", "").startswith("application/json"):
        return JSONResponse(
            resp.json(),
            status_code=resp.status_code,
            headers=response_headers,
        )

    return PlainTextResponse(
        resp.text,
        status_code=resp.status_code,
        headers=response_headers,
    )


@app.options("/mcp", include_in_schema=False)
async def options_mcp_no_slash() -> Response:
    return await options_mcp()


@app.post("/mcp", include_in_schema=False)
async def proxy_mcp_no_slash(request: Request):
    return await proxy_mcp(request)


app.mount("/", StaticFiles(directory=WEB_ROOT, html=True), name="static")


def main() -> None:
    import uvicorn

    uvicorn.run("server:app", host="127.0.0.1", port=PORT, reload=True)


if __name__ == "__main__":
    main()

