const mainUrl = 'http://localhost:8080';

export const routes = {
    login: mainUrl.concat('/login'),
    getContest:mainUrl.concat('/admin/contestData'),
    postCategories: mainUrl.concat('/admin/category'),
    postContest: mainUrl.concat('/admin/addContest'),
    postContestants: mainUrl.concat('/api/contestant'),
    getContestants: mainUrl.concat('/api/contestants'),
    getCriterias: mainUrl.concat('/admin/categories'),
    getRounds: mainUrl.concat('/api/contestant'),
    getSets: mainUrl.concat('/api/contestant'),

    // --------

    deleteTeam: (id) => mainUrl.concat(`/contestant/${id}`)
}