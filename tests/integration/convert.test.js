const request = require('supertest');
let {server} = require('../../index');
describe('/api/convert',()=>{
    beforeEach(()=> server );
    afterEach(()=>{server.close()})
    describe('POST',()=>{
        it('return 200 if succesful',async()=>{
        const res = await  request(server)
            .post('/api/convert')
            .send({input : '2mi'});
            expect(res.status).toBe(200);
        });

        it('return 404 for invalid number',async()=>{
            const res = await request(server)
            .post('/api/convert')
            .send({input : '/2/mi'});
            expect(res.status).toBe(400);
        });

        it('return 200 if no number',async()=>{
            const res = await request(server)
            .post('/api/convert')
            .send({input : 'mi'});
            expect(res.status).toBe(200);
        });

        it('return string if succesful',async()=>{
            const res = await request(server)

            .post('/api/convert')
            .send({input: '3mi'});
            expect(res.text).toContain(`3 mi converts to 4.82802 km`);
        });

    });
});