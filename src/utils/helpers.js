const cssStyle = `
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; background: #f4f6f9; color: #333; }
    .container { max-width: 900px; margin: 0 auto; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
    h1, h2 { color: #2c3e50; margin-bottom: 20px; }
    
    table { width: 100%; border-collapse: separate; border-spacing: 0; margin-top: 20px; border: 1px solid #eee; border-radius: 8px; overflow: hidden; }
    th, td { padding: 15px; text-align: left; border-bottom: 1px solid #eee; }
    th { background: #343a40; color: white; font-weight: 600; text-transform: uppercase; font-size: 14px; }
    tr:last-child td { border-bottom: none; }
    tr:hover { background-color: #f8f9fa; }
    
    .btn { padding: 10px 15px; text-decoration: none; border-radius: 6px; color: white; display: inline-block; font-size: 14px; border: none; cursor: pointer; transition: background 0.2s; font-weight: 500; }
    .btn-primary { background: #0d6efd; } .btn-primary:hover { background: #0b5ed7; }
    .btn-danger { background: #dc3545; } .btn-danger:hover { background: #bb2d3b; }
    .btn-warning { background: #ffc107; color: #000; } .btn-warning:hover { background: #ffca2c; }
    .btn-secondary { background: #6c757d; } .btn-secondary:hover { background: #5c636a; }
    
    .form-group { margin-bottom: 20px; }
    label { display: block; margin-bottom: 8px; font-weight: 500; }
    input[type="text"], input[type="number"], select, input[type="file"] { width: 100%; padding: 10px 12px; margin-top: 5px; border: 1px solid #ced4da; border-radius: 6px; font-size: 16px; box-sizing: border-box; }
    input:focus, select:focus { outline: none; border-color: #86b7fe; box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25); }
    
    img.preview { width: 50px; height: 50px; object-fit: cover; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
    .badge { padding: 5px 10px; border-radius: 20px; font-size: 12px; font-weight: bold; }
  </style>
`;

module.exports = { cssStyle };
