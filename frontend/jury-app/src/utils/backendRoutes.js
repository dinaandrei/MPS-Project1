const mainUrl = 'http://localhost:8080';

export const routes = {

    // -------------- login ------------------

    getAuthStatusAdmin: mainUrl.concat('/admin/adminAccount'),
    getAuthStatusJury: mainUrl.concat('/admin/juryAccount'),
    postCredentials: mainUrl.concat('/admin/juryAccount'),

    // -------------- get -------------------

    getContest:mainUrl.concat('/admin/contestData'),
    getContestants: mainUrl.concat('/api/contestants'),
    getCriterias: mainUrl.concat('/admin/categories'),
    getRounds: mainUrl.concat('/api/contestant'),
    getSets: mainUrl.concat('/api/contestant'),

    // -------------- post -------------------

    postCategories: mainUrl.concat('/admin/category'),
    postContest: mainUrl.concat('/admin/addContest'),
    postContestants: mainUrl.concat('/api/contestant'),

    // ------------- delete ----------------

    deleteTeam: (id) => mainUrl.concat(`/api/contestant/${id}`),
    deleteCriteria: (id) => mainUrl.concat(`/admin//category/${id}`)
}