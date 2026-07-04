#!/usr/bin/env python3
"""
Launch the portfolio locally with caching DISABLED, so you always
see the latest edits (no more stale-file confusion).

    python3 serve.py        # then open http://localhost:8000

Stop with Ctrl+C.
"""
import http.server, socketserver

PORT = 8000

class NoCache(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()
    # silence harmless broken-pipe noise on reloads
    def handle_one_request(self):
        try:
            super().handle_one_request()
        except (BrokenPipeError, ConnectionResetError):
            pass

print(f"\n  Portfolio running →  http://localhost:{PORT}\n  (Ctrl+C to stop)\n")
with socketserver.ThreadingTCPServer(("", PORT), NoCache) as httpd:
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n  stopped.\n")
