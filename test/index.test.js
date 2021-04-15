import 'regenerator-runtime/runtime';
import {buildUrl, makeApiCall} from "../src";

function mockFetch(status, data) {
    const xhrMockObj = {
        open: jest.fn(),
        send: jest.fn(),
        setRequestHeader: jest.fn(),
        onreadystatechange: jest.fn(),
        readyState: 4,
        status,
        responseText: JSON.stringify(data),
    };

    const xhrMockClass = () => xhrMockObj;

    global.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass);

    setTimeout(() => {
        xhrMockObj.onreadystatechange();
    }, 0);
}

test('Should throw error when no key is configured', () => {
    let thrownError;
    try {
        makeApiCall('test', null, null)
    } catch (error) {
        thrownError = error;
    }

    let expectedErrorObj = new Error('No api key is set.');
    expect(thrownError).toEqual(expectedErrorObj);
});

test('Verify URL syntax', () => {

    // use buildUrl since makeApiCall returns promise
    // but buildUrl is implicitly used for url building
    // meaning if it is ok in this function, it will be ok in makeApiCall
    const url = buildUrl('the-service', '123ABC', 'email=bob@corp.com')

    expect(url).toEqual('https://the-service.abstractapi.com/v1?api_key=123ABC&email=bob@corp.com&lang=js');
});

test('Should return object when 200', async () => {

    mockFetch(200, {}); // dummy object
    let response = await makeApiCall('the-service', '123ABC', 'email=bob@corp.com')
    expect(typeof response).toBe('object')
});

test('Should reject when not 200', async () => {

    let thrownError;
    try {
        mockFetch(300, new Error('Timeout'));
        await makeApiCall('the-service', '123ABC', 'email=bob@corp.com')
    } catch (error) {
        thrownError = error;
    }

    expect(thrownError.status).toBe(300)
});