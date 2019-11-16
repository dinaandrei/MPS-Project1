const mainUrl = 'http://localhost:8080';

export const routes = {
    login: mainUrl.concat('/login'),
    getCategories: mainUrl.concat('/admin/categories'),
    getContest:mainUrl.concat('/admin/contestData'),
    postCategories: mainUrl.concat('/admin/category'),
    postContest: mainUrl.concat('/admin/addContest'),
    postContestants: mainUrl.concat('/api/contestant'),
}