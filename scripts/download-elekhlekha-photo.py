import json
import urllib.request

API = "https://www.elekhlekha.xyz/api/v3/getSignedFileUrls"
payload = {
    "urls": [
        {
            "url": "https://prod-files-secure.s3.us-west-2.amazonaws.com/45d9ba65-e286-4c4b-8c56-020b0d9eaba1/43b5fd81-d033-43d3-911e-0e8d8a999358/DSC07438.jpg",
            "permissionRecord": {
                "table": "block",
                "id": "11ffe335-7503-80c7-83e3-e12df65e3fa8",
            },
        }
    ]
}

req = urllib.request.Request(
    API,
    data=json.dumps(payload).encode(),
    headers={"Content-Type": "application/json", "User-Agent": "Mozilla/5.0"},
)
with urllib.request.urlopen(req, timeout=30) as resp:
    data = json.loads(resp.read().decode("utf-8"))

print(json.dumps(data, indent=2, ensure_ascii=False))

if data.get("signedUrls"):
    signed = data["signedUrls"][0]["signedUrl"]
    print("signed", signed[:120])
    out = urllib.request.urlopen(
        urllib.request.Request(signed, headers={"User-Agent": "Mozilla/5.0"}),
        timeout=60,
    )
    content = out.read()
    open("public/assets/ARTISTS/elekhlekha.jpg", "wb").write(content)
    print("saved", len(content), "bytes")
