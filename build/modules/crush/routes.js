"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var controller_1 = require("./controller");
var httpStatus = require("http-status");
var sendReponse = function(res, statuscode, data){
    res.status(statusCode).json({ result: data });
};
var CrushRoutes = /** @class */ (function () {
    function CrushRoutes() {}
    CrushRoutes.prototype.getAll = function (req, res) {
        controller_1.default.getAll()
            .then(function (crushs) { return sendReponse(res, httpStatus.OK, crushs); })
            .catch(function (err){
                console.error('Erro: ' + err);
                sendReponse(res, httpStatus.INTERNAL_SERVER_ERROR, {});
            });
    };

    CrushRoutes.prototype.getById = function (req, res) {
        var id = { _id: req.params.id };
        if(!id){
            sendReponse(res, httpStatus.OK, 'Crush não encontrado');
        }
        controller_1.default.getByID(id)
            .then(function (crush) { return sendReponse(res, httpStatus.OK, crush); })
            .catch(function (err){
                console.error('Erro: ' + err);
                sendReponse(res, httpStatus.INTERNAL_SERVER_ERROR, {});
            });
    };

    CrushRoutes.prototype.create = function (req, res) {
        var crush = req.body;
        controller_1.default.create(crush)
            .then(function (crush) { 
                return sendReponse(res, httpStatus.CREATED, 'Crush criadx com amor!'); 
            })
            .catch(function (err){
                console.error('Erro: ' + err);
                sendReponse(res, httpStatus.INTERNAL_SERVER_ERROR, {});
            });
    };

    CrushRoutes.prototype.update = function (req, res) {
        var id = { _id: req.params.id };
        var crush = req.body;
        controller_1.default.update(id, crush)
            .then(function (crush) { 
                return sendReponse(res, httpStatus.OK, 'Crush alterado!'); })
            .catch(function (err){
                console.error('Erro: ' + err);
                sendReponse(res, httpStatus.INTERNAL_SERVER_ERROR, {});
            });
    };

    CrushRoutes.prototype.delete= function (req, res) {
        var id = { _id: req.params.id };
        controller_1.default.delete(id)
            .then(function (result) { return sendReponse(res, httpStatus.OK, result); })
            .catch(function (err){
                console.error('Erro: ' + err);
                sendReponse(res, httpStatus.INTERNAL_SERVER_ERROR, {});
            });
    };
    return CrushRoutes;
}());
exports.default = new CrushRoutes();