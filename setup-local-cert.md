# Setting up Local HTTPS Certificate for CCP

## Option 1: Self-Signed Certificate with Chrome Flags
For development, you can start Chrome with:
```bash
chrome.exe --disable-features=BlockInsecurePrivateNetworkRequests --ignore-certificate-errors-spki-list --ignore-certificate-errors --ignore-ssl-errors
```

## Option 2: Use mkcert for Local Development
1. Install mkcert: https://github.com/FiloSottile/mkcert
2. Generate local certificate:
   ```bash
   mkcert -install
   mkcert localhost 127.0.0.1 ::1
   ```
3. Configure your CCP service to use the generated certificate

## Option 3: Browser Settings
In Chrome, go to:
- chrome://settings/privacy
- Security → Manage certificates
- Add your local certificate to "Trusted Root Certification Authorities"

## Option 4: Corporate/Enterprise Policy
If deploying to users, configure Chrome enterprise policy:
```json
{
  "InsecurePrivateNetworkRequestsAllowed": ["https://yourdomain.com"],
  "InsecurePrivateNetworkRequestsAllowedForUrls": ["https://yourdomain.com"]
}
```