// star-sdk.js
const StarMarket = (function() {
    return {
        init: function(config) {
            console.log("StarMarket SDK ishga tushdi. API Key:", config.apiKey);
            const container = document.querySelector(config.container);
            
            if (!container) {
                console.error("Xato: Konteyner topilmadi!");
                return;
            }

            const dbUrl = "https://magnetic-alloy-467611-u7-default-rtdb.firebaseio.com/apps.json";

            fetch(dbUrl)
            .then(res => res.json())
            .then(data => {
                if (!data) {
                    container.innerHTML = "<p>Ilovalar topilmadi.</p>";
                    return;
                }

                let html = '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 15px; font-family: sans-serif;">';
                for (let key in data) {
                    const app = data[key];
                    html += `
                        <div style="text-align: center; background: #fff; padding: 10px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                            <img src="${app.image}" style="width: 65px; height: 65px; border-radius: 15px; object-fit: cover;">
                            <div style="font-size: 12px; margin-top: 5px; font-weight: bold; color: #333; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${app.name}</div>
                            <a href="${app.link}" target="_blank" style="display: block; margin-top: 5px; padding: 5px; background: #01875f; color: #fff; text-decoration: none; border-radius: 5px; font-size: 10px;">O'rnatish</a>
                        </div>`;
                }
                html += '</div>';
                container.innerHTML = html;
                console.log("Ilovalar muvaffaqiyatli yuklandi!");
            })
            .catch(err => {
                console.error("SDK Xatosi:", err);
                container.innerHTML = "<p style='color:red;'>Yuklashda xatolik!</p>";
            });
        }
    };
})();
