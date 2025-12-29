// star-sdk.js
const StarMarket = (function() {
    return {
        init: function(config) {
            console.log("StarMarket SDK ishga tushdi...");
            const container = document.querySelector(config.container);
            
            if (!container) {
                console.error("Xato: Konteyner topilmadi!");
                return;
            }

            const dbUrl = "https://magnetic-alloy-467611-u7-default-rtdb.firebaseio.com/apps.json";

            fetch(dbUrl)
            .then(res => {
                if (!res.ok) throw new Error("Tarmoq xatosi");
                return res.json();
            })
            .then(data => {
                if (!data) {
                    container.innerHTML = "<p>Ilovalar topilmadi.</p>";
                    return;
                }

                let html = `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: 15px; font-family: sans-serif;">`;
                
                for (let key in data) {
                    const app = data[key];
                    html += `
                        <div style="text-align: center; background: #fff; padding: 10px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                            <img src="${app.image}" style="width: 70px; height: 70px; border-radius: 18%; object-fit: cover;">
                            <div style="font-size: 13px; margin-top: 8px; font-weight: 500; color: #333; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                                ${app.name}
                            </div>
                            <a href="${app.link}" target="_blank" style="display: inline-block; margin-top: 8px; padding: 4px 12px; background: #01875f; color: white; text-decoration: none; border-radius: 6px; font-size: 11px;">O'rnatish</a>
                        </div>`;
                }
                
                html += '</div>';
                container.innerHTML = html;
            })
            .catch(err => {
                console.error("SDK Xatosi:", err);
                container.innerHTML = "<p style='color:red;'>Yuklashda xatolik yuz berdi.</p>";
            });
        }
    };
})();
