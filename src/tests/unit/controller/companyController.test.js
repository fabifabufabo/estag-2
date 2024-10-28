import CompanyController from "../../../controllers/companyController.js";
import { companies } from "../../../models/index.js";
import validateCompanyCreate from "../../../usecases/validateCompanyCreate.js";
import BadRequestError from "../../../errors/badRequestError.js";


jest.mock("../../../usecases/validateCompanyCreate.js")

describe('Testing company controller companyController', () => {
    let req, res, next;

    beforeEach(() => {

        req = {
            body: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();

    });

    afterEach(() => {
        jest.clearAllMocks();
    })

    test('Should return a status 200 when register company', async () => {

        req.body = {
            "name": "valid_name",
            "document": "valid_document",
            "city": 5,
            "image": "valid_url"
        }

        const createSpy = jest.spyOn(companies, 'create').mockResolvedValue()

        await CompanyController.registerCompany(req, res, next)

        expect(validateCompanyCreate).toHaveBeenCalledWith(req.body)
        expect(res.status).toHaveBeenCalledWith(201);
        expect(createSpy).toHaveBeenCalled()
        expect(res.json).toHaveBeenCalled()
    })

    test('Should call the next function with the correct error if repository fails', async () => {

        req.body = {
            "name": "valid_name",
            "document": "valid_document",
            "city": 5,
            "image": "valid_url"
        }

        jest.spyOn(companies, 'create').mockImplementationOnce(() => {
            throw BadRequestError
        })

        await CompanyController.registerCompany(req, res, next)

        expect(next).toHaveBeenCalledTimes(1)
        expect(next).toHaveBeenCalledWith(BadRequestError)
    })
})
