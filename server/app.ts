import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import DataBase from './config/db';
import CrushRoutes from './modules/crush/routes';

class App{
    public app: express.Application;
    private morgan: morgan.Morgan;
    private bodyParser;
    private database: DataBase;

    constructor(){
        this.app = express();
        this.database = new DataBase();
        this.middleware();
        this.routes();
        this.databaseConnection();
    }

    databaseConnection(){
        this.database.createConnection();
    }

    closeDataBaseCOnnection(message, callback){
        this.database.closeConnection(message, () => callback());
    }

    middleware() {
        this.app.use(morgan('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended:true}));
    }

    routes() {
        this.app.route('/').get((req, res) => res.status(200).json({
            'message':'Hello world!'
        }));
        this.app.route('/api/crushs').get(CrushRoutes.getAll);
        this.app.route('/api/crushs/:id').get(CrushRoutes.getByID);
        this.app.route('/api/crushs').post(CrushRoutes.create);
        this.app.route('/api/crushs/:id').put(CrushRoutes.update);
        this.app.route('/api/crushs/:id').delete(CrushRoutes.delete);
    }
}

export default new App();