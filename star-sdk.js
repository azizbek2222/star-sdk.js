// star-sdk.js
const StarMarket = (function() {
    
    // 1. Reklama va Telegram skriptlarini dinamik yuklash funksiyasi
    function loadExternalScripts(callback) {
        // Telegram WebApp skriptini tekshirish va yuklash
        if (!window.Telegram || !window.Telegram.WebApp) {
            const tgScript = document.createElement('script');
            tgScript.src = "https://telegram.org/js/telegram-web-app.js?56";
            document.head.appendChild(tgScript);
        }

        // Adexium Widget skriptini yuklash
        const adexScript = document.createElement('script');
        adexScript.src = "https://cdn.tgads.space/assets/js/adexium-widget.min.js";
        adexScript.type = "text/javascript";
        
        adexScript.onload = () => {
            console.log("Adexium SDK yuklandi.");
            if (callback) callback();
        };
        
        document.head.appendChild(adexScript);
    }

    // 2. Reklamani ishga tushirish funksiyasi
    function initAdexium() {
        if (window.AdexiumWidget) {
            try {
                const adexiumWidget = new AdexiumWidget({
                    wid: '7ccc8b4c-5979-46e7-849c-a8225ee70a04', // Sizning reklamangiz ID-si
                    adFormat: 'interstitial' // To'liq ekranli reklama
                });
                adexiumWidget.autoMode();
                console.log("Adexium avtomatik reklama rejimi ishga tushdi.");
            } catch (err) {
                console.error("Reklamani ishga tushirishda xato:", err);
            }
        }
    }

    return {
        init: function(config) {
            console.log("StarMarket SDK ishga tushdi...");

            // Skriptlarni yuklash va keyin reklamani yoqish
            loadExternalScripts(() => {
                initAdexium();
            });

            const container = document.querySelector(config.container);
            if (!container) return;

            // Ilovalar ro'yxatini Firebase'dan olish
            const dbUrl = "https://magnetic-alloy-467611-u7-default-rtdb.firebaseio.com/apps.json";

            fetch(dbUrl)
            .then(res => res.json())
            .then(data => {
                if (!data) {
                    container.innerHTML = "<p>Ilovalar topilmadi.</p>";
                    return;
                }

                let html = `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: 15px; font-family: sans-serif; padding: 10px;">`;
                
                for (let key in data) {
                    const app = data[key];
                    html += `
                        <div style="text-align: center; background: #fff; padding: 12px; border-radius: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.08);">
                            <img src="${app.image}" style="width: 65px; height: 65px; border-radius: 15px; object-fit: cover; margin-bottom: 8px;">
                            <div style="font-size: 12px; font-weight: 600; color: #333; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${app.name}</div>
                            <a href="${app.link}" target="_blank" style="display: block; margin-top: 10px; padding: 6px; background: #01875f; color: #fff; text-decoration: none; border-radius: 8px; font-size: 11px; font-weight: bold;">O'rnatish</a>
                        </div>`;
                }
                
                html += '</div>';
                container.innerHTML = html;
            })
            .catch(err => {
                console.error("SDK Data Error:", err);
            });
        }
    };
})();
