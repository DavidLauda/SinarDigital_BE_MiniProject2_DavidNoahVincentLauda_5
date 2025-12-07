const prisma = require("../utils/prismaClient");
const { cssStyle } = require("../utils/helpers");
const fs = require("fs");
const path = require("path");

const getAllCandidates = async (req, res, next) => {
  try {
    const candidates = await prisma.candidate.findMany({
      include: { division: true },
      orderBy: { createdAt: "desc" },
    });

    const rows = candidates
      .map(
        (c, i) => `
            <tr>
                <td>${i + 1}</td>
                <td>
                    ${
                      c.photo
                        ? `<img src="/uploads/${c.photo}" class="preview">`
                        : '<span class="badge" style="background:#ccc; color:white;">No Photo</span>'
                    }
                </td>
                <td><b>${c.name}</b><br><small style="color:#666">${
          c.nim
        }</small></td>
                <td>${c.division.name}</td>
                <td>${c.gpa}</td>
                <td>
                    <a href="/candidate/edit/${
                      c.id
                    }" class="btn btn-warning">Edit</a>
                    <form action="/candidate/delete/${
                      c.id
                    }" method="POST" style="display:inline;" onsubmit="return confirm('Are you sure?')">
                        <button type="submit" class="btn btn-danger">Delete</button>
                    </form>
                </td>
            </tr>
        `
      )
      .join("");

    res.send(`
            ${cssStyle}
            <div class="container">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                    <h1>BNCC Candidate List</h1>
                    <a href="/candidate/create" class="btn btn-primary">+ Add Candidate</a>
                </div>
                <table>
                    <thead>
                        <tr><th>#</th><th>Photo</th><th>Name</th><th>Division</th><th>GPA</th><th>Action</th></tr>
                    </thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>
        `);
  } catch (err) {
    next(err);
  }
};

const getCreateForm = async (req, res, next) => {
  try {
    const divisions = await prisma.division.findMany();
    const options = divisions
      .map((d) => `<option value="${d.id}">${d.name}</option>`)
      .join("");

    res.send(`
            ${cssStyle}
            <div class="container" style="max-width: 600px;">
                <h2>Add New Candidate</h2>
                <form action="/candidate/store" method="POST" enctype="multipart/form-data">
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" name="name" required placeholder="Full Name">
                    </div>
                    <div class="form-group">
                        <label>NIM</label>
                        <input type="text" name="nim" required placeholder="Binusian ID">
                    </div>
                    <div class="form-group">
                        <label>GPA</label>
                        <input type="number" step="0.01" name="gpa" required placeholder="0.00 - 4.00">
                    </div>
                    <div class="form-group">
                        <label>Division</label>
                        <select name="divisionId">${options}</select>
                    </div>
                    <div class="form-group">
                        <label>Profile Photo</label>
                        <input type="file" name="photo" accept="image/*">
                    </div>
                    <div style="margin-top:20px;">
                        <button type="submit" class="btn btn-primary">Save Data</button>
                        <a href="/" class="btn btn-secondary">Cancel</a>
                    </div>
                </form>
            </div>
        `);
  } catch (err) {
    next(err);
  }
};

const storeCandidate = async (req, res, next) => {
  try {
    const { name, nim, gpa, divisionId } = req.body;
    const photo = req.file ? req.file.filename : null;

    await prisma.candidate.create({
      data: {
        name,
        nim,
        gpa: parseFloat(gpa),
        divisionId: parseInt(divisionId),
        photo: photo,
      },
    });
    res.redirect("/");
  } catch (err) {
    next(err);
  }
};

const getEditForm = async (req, res, next) => {
  try {
    const { id } = req.params;
    const candidate = await prisma.candidate.findUnique({
      where: { id: parseInt(id) },
    });

    if (!candidate) return res.status(404).send("Candidate not found");

    const divisions = await prisma.division.findMany();

    const options = divisions
      .map(
        (d) =>
          `<option value="${d.id}" ${
            candidate.divisionId === d.id ? "selected" : ""
          }>${d.name}</option>`
      )
      .join("");

    res.send(`
            ${cssStyle}
            <div class="container" style="max-width: 600px;">
                <h2>Edit Candidate</h2>
                <form action="/candidate/update/${id}" method="POST" enctype="multipart/form-data">
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" name="name" value="${
                          candidate.name
                        }" required>
                    </div>
                    <div class="form-group">
                        <label>NIM</label>
                        <input type="text" name="nim" value="${
                          candidate.nim
                        }" required>
                    </div>
                    <div class="form-group">
                        <label>GPA</label>
                        <input type="number" step="0.01" name="gpa" value="${
                          candidate.gpa
                        }" required>
                    </div>
                    <div class="form-group">
                        <label>Division</label>
                        <select name="divisionId">${options}</select>
                    </div>
                    <div class="form-group">
                        <label>Change Photo (Optional)</label>
                        <input type="file" name="photo" accept="image/*">
                        ${
                          candidate.photo
                            ? `<div style="margin-top:10px;"><small>Current:</small><br><img src="/uploads/${candidate.photo}" class="preview"></div>`
                            : ""
                        }
                    </div>
                    <div style="margin-top:20px;">
                        <button type="submit" class="btn btn-primary">Update Data</button>
                        <a href="/" class="btn btn-secondary">Cancel</a>
                    </div>
                </form>
            </div>
        `);
  } catch (err) {
    next(err);
  }
};

const updateCandidate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, nim, gpa, divisionId } = req.body;

    const oldData = await prisma.candidate.findUnique({
      where: { id: parseInt(id) },
    });
    if (!oldData) return res.status(404).send("Data not found");

    let photo = oldData.photo;

    if (req.file) {
      photo = req.file.filename;

      if (oldData.photo) {
        const oldPath = path.join(
          __dirname,
          "../../public/uploads",
          oldData.photo
        );
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
    }

    await prisma.candidate.update({
      where: { id: parseInt(id) },
      data: {
        name,
        nim,
        gpa: parseFloat(gpa),
        divisionId: parseInt(divisionId),
        photo: photo,
      },
    });
    res.redirect("/");
  } catch (err) {
    next(err);
  }
};

const deleteCandidate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const candidate = await prisma.candidate.findUnique({
      where: { id: parseInt(id) },
    });

    if (candidate && candidate.photo) {
      const filePath = path.join(
        __dirname,
        "../../public/uploads",
        candidate.photo
      );
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await prisma.candidate.delete({ where: { id: parseInt(id) } });

    res.redirect("/");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllCandidates,
  getCreateForm,
  storeCandidate,
  getEditForm,
  updateCandidate,
  deleteCandidate,
};
