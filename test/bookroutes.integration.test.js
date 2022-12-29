const express = require('express');
const request = require('supertest');
const { JsxEmit } = require('typescript');
const bookRoutes = require('../routes/books.routes');
const { save } = require('../services/save.services');


const app = express();

app.use(express.json());

app.use("/api/books",bookRoutes);

jest.mock("../data/books.json",()=>{
    [{
               "name": "Classy Doll", "author": "Bae", "id": 2
             }]
})


describe("Integration Test for the books API",()=>{
   
   it('GET /api/books - success- get all the books',async () => {
    const {body,statusCode}= await request(app).get("/api/books")
  expect(body).toEqual(
    expect.arrayContaining([
        expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            author: expect.any(String)
        })
    ])
  )
  expect(statusCode).toBe(200)
}) 
it('POST /api/books - failure on invalid post book',async ()=>{


    const {body, statusCode} = await request(app).post("/api/books").send({
        name: "",
        author:"John Traver"
    })
    expect(statusCode).toBe(400)
    expect(body).toEqual({
        errors:[
            {
                location: "body",
                msg:"book name is required",
                param: "name",
                value: ""
        }
        ]
    })
})
    it('POST /api/books - success', async() => {
            const {body, statusCode} = await request(app).post('/api/books').send({
                name: "Face Off",
                author: "John Traver"
            })
            expect(statusCode).toBe(200);
            expect(body).toEqual({
                 message: "Success"
             })
    })

    it('PUT /api/books/:bookid - failure when book is not found', async() => {
        const {body, statusCode} = await request(app).put('/api/books/3000').send({
            name: "Love lace",
            author: "John Traver"
        })
        expect(statusCode).toBe(404)
        expect(body).toEqual({
            error: true,
            message: "book not found"
        });
    });
    it('PUT /api/books/:bookid - Success - Successfully update book', async() => {
        const {body, statusCode} = await request(app).put('/api/books/2').send({
            name: "Love Antidote",
            author: "Jack White"
        })
        expect(statusCode).toBe(201)
        expect(body).toEqual({
            name: "Love Antidote",
            author: "Jack White",
            id:2
        });
    });
    it('DELETE /api/books/:bookid - failure when book is not found',async ()=>{
        const {body, statusCode} = await request(app).delete('/api/books/3000')
         
        expect(statusCode).toBe(404)
        expect(body).toEqual({
            error: true,
            message: "book not found"  
    })
})
     it('DELETE /api/books/:bookid - failure when book is not found',async ()=>{
    const {body,statusCode} = await request(app).delete('/api/books/3')
     
    expect(statusCode).toBe(201)
    expect(body).toEqual({
        message: "Success"  
})
}) 
})
