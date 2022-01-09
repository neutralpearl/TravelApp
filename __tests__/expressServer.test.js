const app = require("../src/client/js/app");
// const server = require("../src/server/server");
const supertest = require('supertest');
const express = require('express');
import { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks();

describe("instance of express server", () => {

    const city = 'Atlanta';
    const lat = '33.749';
    const lon = '-84.38798';

    test("retrieves JSON from Geonames API", (done) => {
        supertest(app)
            .get(`/get-geonames/:${city}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
    });

    test("retrieves JSON from Weatherbit current weather API", (done) => {
        supertest(app)
            .get(`/get-weatherbit-current/:${lat}/:${lon}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
    });

    test("retrieves JSON from Weatherbit forecast API", (done) => {
        supertest(app)
            .get(`/get-weatherbit-forecast/:${lat}/:${lon}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
    });
    
    test("retrieves JSON from Pixabay API", (done) => {
        supertest(app)
            .get(`/get-pixabay-photo/:${city}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
    });
});

