const { cssStyle } = require("../utils/helpers");

const errorHandler = (err, req, res, next) => {
  console.error("🔥 Error Log:", err.stack);

  res.status(500).send(`
        ${cssStyle}
        <div class="container" style="text-align: center; color: #dc3545;">
            <h1>Terjadi Kesalahan (500)</h1>
            <p>Maaf, server mengalami gangguan saat memproses permintaan Anda.</p>
            <div style="background: #fff3cd; color: #856404; padding: 15px; border-radius: 5px; text-align: left; margin: 20px 0; overflow-x: auto;">
                <code>${err.message}</code>
            </div>
            <a href="/" class="btn btn-primary">Kembali ke Beranda</a>
        </div>
    `);
};

module.exports = errorHandler;
