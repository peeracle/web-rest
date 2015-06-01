/*
 * Copyright (c) 2015 peeracle contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

'use strict';

process.env.NODE_ENV = 'test';

var app = require('../../app');
var request = require('supertest');

describe('GET /v1/users', function () {
  it('should GET an empty object', function (done) {
    request(app)
      .get('/v1/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json')
      .expect('Cache-Control', /private/)
      .expect('ETag', /./)
      .expect('Last-Modified', /./)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        it('should return a 304 Not Modified status code', function (done) {
          request(app)
            .get('/v1/users')
            .set('Accept', 'application/json')
            .set('If-None-Match', res.headers['etag'])
            .expect('Cache-Control', /private/)
            .expect('ETag', /./)
            .expect('Last-Modified', /./)
            .expect(304, done);
        });
      });
  });
});

describe('POST /v1/users', function () {
  it('should POST an empty request', function (done) {
    request(app)
      .post('/v1/users')
      .set('Accept', 'application/json')
      .expect(201)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        it('should return a 200 OK status code', function (done) {
          request(app)
            .get('/v1/users')
            .set('Accept', 'application/json')
            .set('If-None-Match', res.headers['etag'])
            .expect('Cache-Control', /private/)
            .expect('ETag', /./)
            .expect('Last-Modified', /./)
            .expect(200, done);
        });
      });
  });
});
