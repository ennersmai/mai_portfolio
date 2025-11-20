import React from 'react';

const PPHWidget: React.FC = () => {
  // We inject the raw HTML/Script provided by PPH into an isolated iframe environment (srcDoc).
  // We explicitly force HTTPS for the script source to avoid Mixed Content errors,
  // as document.location.protocol inside a srcDoc iframe is often 'about:' or 'blob:'.
  const embedCode = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
        <style>
          body { margin: 0; padding: 0; background: transparent; overflow: hidden; }
          /* Ensure the widget container fits */
          #pph-hireme { width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; }
          /* Style for potential PPH injected elements */
          iframe { border: none; }
        </style>
      </head>
      <body>
        <div id="pph-hireme"></div>
        <script type="text/javascript">
          (function(d, s) {
              var js, where = d.getElementsByTagName(s)[0],
              js = d.createElement(s);
              // FORCE HTTPS:
              js.src = 'https://www.peopleperhour.com/hire/1480752533/11906506.js?width=245&height=320&orientation=vertical&theme=dark&hourlies=1053149%2C1083857&rnd='+parseInt(Math.random()*10000, 10);
              try { where.parentNode.insertBefore(js, where); } catch (e) { if (typeof console !== 'undefined' && console.log && e.stack) { console.log(e.stack); } }
          }(document, 'script'));
          
          // Intercept and upgrade HTTP to HTTPS for dynamically created elements
          (function() {
            var observer = new MutationObserver(function(mutations) {
              mutations.forEach(function(mutation) {
                mutation.addedNodes.forEach(function(node) {
                  if (node.nodeType === 1) { // Element node
                    // Fix iframes
                    if (node.tagName === 'IFRAME' && node.src && node.src.startsWith('http://')) {
                      node.src = node.src.replace('http://', 'https://');
                    }
                    // Fix scripts
                    if (node.tagName === 'SCRIPT' && node.src && node.src.startsWith('http://')) {
                      node.src = node.src.replace('http://', 'https://');
                    }
                    // Check nested elements
                    var iframes = node.querySelectorAll ? node.querySelectorAll('iframe[src^="http://"]') : [];
                    var scripts = node.querySelectorAll ? node.querySelectorAll('script[src^="http://"]') : [];
                    iframes.forEach(function(iframe) {
                      iframe.src = iframe.src.replace('http://', 'https://');
                    });
                    scripts.forEach(function(script) {
                      script.src = script.src.replace('http://', 'https://');
                    });
                  }
                });
              });
            });
            observer.observe(document.body, { childList: true, subtree: true });
          })();
        </script>
      </body>
    </html>
  `;

  return (
    <div className="relative bg-zinc-900 border border-zinc-800 w-[245px] h-[320px]">
      {/* Fallback / Loading Layer - Clickable Link */}
      <a 
        href="https://www.peopleperhour.com/hire/1480752533" 
        target="_blank" 
        rel="noopener noreferrer"
        className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center hover:bg-zinc-800 transition-colors group text-decoration-none cursor-pointer"
      >
          <div className="w-8 h-8 border-t-2 border-accent border-r-2 border-accent/30 rounded-full animate-spin mx-auto mb-4 group-hover:border-white"></div>
          <span className="text-xs text-gray-500 font-mono group-hover:text-accent">LOADING_WIDGET...</span>
          <span className="text-[10px] text-zinc-600 mt-2 group-hover:text-white">(Click to view profile)</span>
      </a>

      {/* Widget Iframe */}
      <iframe
        srcDoc={embedCode}
        title="PeoplePerHour Profile"
        className="absolute inset-0 z-20 w-full h-full border-none overflow-hidden"
        scrolling="no"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        allow="clipboard-write"
      />
    </div>
  );
};

export default PPHWidget;