app.post("/postmhs", (req, res) => {
    const nim_mahasiswa = req.body.nim_mahasiswa;
    const nama_mahasiswa= req.body.nama_mahasiswa;
    const alamat_mahasiswa= req.body.alamat_mahasiswa;

    client.query(`INSERT INTO mahasiswa (nim_mahasiswa, nama_mahasiswa, alamat_mahasiswa) VALUES
    ($1, $2, $3)`,[nim_mahasiswa, nama_mahasiswa, alamat_mahasiswa] , (err, result) => {
        if (!err) {
            console.log('Insert Success');
            res.send({
                message: "Insert Success"
            });
        } else {
            console.log('Terjadi error', err.message);
            res.send({message : "Error"})
        }
    });
});