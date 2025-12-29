// star-sdk.js
const StarMarket = (function() {
    
    // 1. AdsGram skriptini dinamik yuklash
    function loadAdsGram(callback) {
        if (!window.Adsgram) {
            const script = document.createElement('script');
            script.src = "https://sad.adsgram.ai/js/sad.min.js";
            script.onload = () => {
                console.log("AdsGram yuklandi.");
                if (callback) callback();
            };
            document.head.appendChild(script);
        } else {
            if (callback) callback();
        }
    }

    // 2. Reklamani ko'rsatish funksiyasi
    function showAutoAd() {
        if (window.Adsgram) {
            // "4867" o'rniga o'zingizning AdsGram Block ID raqamingizni qo'ying
            const AdController = window.Adsgram.init({ blockId: "int-20180" });

            AdController.show().then((result) => {
                console.log("Reklama muvaffaqiyatli ko'rsatildi:", result);
            }).catch((result) => {
                console.error("Reklama ko'rsatishda xato yoki foydalanuvchi yopib yubordi:", result);
            });
        }
    }

    return {
        init: function(config) {
            console.log("StarMarket SDK ishga tushdi...");

            // Skript yuklangach, reklamani darhol ko'rsatish
            loadAdsGram(() => {
                showAutoAd();
            });

            const container = document.querySelector(config.container);
            if (!container) return;

            // Firebase ma'lumotlarini olish
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
            .catch(err => console.error("SDK Error:", err));
        }
    };
})();
