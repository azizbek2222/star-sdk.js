// star-sdk.js
const StarMarket = (function() {
    return {
        init: function(config) {
            const container = document.querySelector(config.container);
            if (!container) return;

            // Ma'lumotlarni olish (Sizning Firebase bazangizdan)
            fetch("https://magnetic-alloy-467611-u7-default-rtdb.firebaseio.com/apps.json")
            .then(res => res.json())
            .then(data => {
                let html = '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 15px;">';
                for (let key in data) {
                    const app = data[key];
                    html += `
                        <div style="text-align: center;">
                            <img src="${app.image}" style="width: 70px; height: 70px; border-radius: 15px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                            <div style="font-size: 12px; margin-top: 5px; font-family: sans-serif;">${app.name}</div>
                        </div>`;
                }
                html += '</div>';
                container.innerHTML = html;
            });
        }
    };
})();
