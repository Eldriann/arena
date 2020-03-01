function handler(req, res) {
    const loginUrl = '/api/login';

    return res.render('dashboard/templates/login', { loginUrl });
}

module.exports = handler;
