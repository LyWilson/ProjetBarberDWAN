const {
    getSalonData,
    getSalonDataBySalonId,
    getReservationData,
    getProfilData,
    verifieClient,
    getCoiffurePreEtablieData,
    getSalonFavoris,
    addSalonToFavorites,
    removeSalonFromFavorites,
    prendreRendezVous,
    getBabierData,
    getReservationsByCoiffeurId,
    getHeuresTravail,
    getUserId,
    deleteReservation,
    modifierRendezVous,
    isSalonFavorite,
    getSalonId,
    modifyClientInfo,
    getReservationsById,
    getBabierDataBySalonId,
    getCoiffurePreEtablieDataBySalonId,
    ajouterAvis,
    getAvisClientsById,
    getCoiffeurId,
    updateSponsor,
    getSponsorId,
    deleteClientAccount,
    getAverageRating
} = require('./fonctionDb');

describe('Test Unitaire des fonctions sql', () => {
    test('Test getSalonData function', async () => {
        // Mock SQL query and response
        const mockQuery = jest.fn().mockResolvedValue({
            recordset: [{id: 1, name: 'Salon 1'}, {
                id: 2,
                name: 'Salon 2'
            }]
        });
        const mockRequest = jest.fn(() => ({query: mockQuery}));
        const mockPool = {request: mockRequest};
        jest.mock('./db', () => ({sql: {connect: jest.fn().mockResolvedValue(mockPool)}, config: {}}));

        // Test function
        const req = {}, res = {json: jest.fn()};
        await getSalonData(req, res);
        expect(mockQuery).toBe(mockQuery)
    });

    test('Test getSalonDataBySalonId function', async () => {
        // Mock SQL query and response
        const mockQuery = jest.fn().mockResolvedValue({recordset: [{id: 1, name: 'Salon 1'}]});
        const mockRequest = jest.fn(() => ({query: mockQuery}));
        const mockPool = {request: mockRequest};
        jest.mock('./db', () => ({sql: {connect: jest.fn().mockResolvedValue(mockPool)}, config: {}}));

        // Test function
        const req = {query: {salonId: 1}}, res = {json: jest.fn(), status: jest.fn()};
        await getSalonDataBySalonId(req, res);
        expect(mockQuery).toBe(mockQuery)
    });

    test('Test getReservationData function', async () => {
        // Mock SQL query and response
        const mockQuery = jest.fn().mockResolvedValue({
            recordset: [{id: 1, date: '2024-05-15'}, {
                id: 2,
                date: '2024-05-16'
            }]
        });
        const mockConnect = jest.fn().mockResolvedValue({query: mockQuery});
        jest.mock('./db', () => ({sql: {connect: mockConnect}, config: {}}));

        // Test function
        const result = await getReservationData('test@example.com');
        expect(result).toBe(result)
    });

    test('Test getProfilData function', async () => {
        // Mock SQL query and response
        const mockQuery = jest.fn().mockResolvedValue({recordset: [{id: 1, name: 'John Doe'}]});
        const mockConnect = jest.fn().mockResolvedValue({query: mockQuery});
        jest.mock('./db', () => ({sql: {connect: mockConnect}, config: {}}));

        // Test function
        const result = await getProfilData('test@example.com');
        expect(result).toBe(result)
    });

    test('Test verifieClient function', async () => {
        // Mock SQL query and response
        const mockQuery = jest.fn().mockResolvedValue({recordset: []});
        const mockConnect = jest.fn().mockResolvedValue({query: mockQuery});
        jest.mock('./db', () => ({sql: {connect: mockConnect}, config: {}}));

        // Test function
        const result = await verifieClient('test@example.com');
        expect(result).toBe(true);
    });

    test('Test getCoiffurePreEtablieData function', async () => {
        // Mock SQL query and response
        const mockQuery = jest.fn().mockResolvedValue({
            recordset: [{id: 1, name: 'Coiffure 1'}, {
                id: 2,
                name: 'Coiffure 2'
            }]
        });
        const mockRequest = jest.fn(() => ({query: mockQuery}));
        const mockPool = {request: mockRequest};
        jest.mock('./db', () => ({sql: {connect: jest.fn().mockResolvedValue(mockPool)}, config: {}}));

        // Test function
        const req = {}, res = {json: jest.fn()};
        await getCoiffurePreEtablieData(req, res);
        expect(mockQuery).toBe(mockQuery)
    });

    test('Test getSalonFavoris function', async () => {
        // Mock SQL query and response
        const mockQuery = jest.fn().mockResolvedValue({
            recordset: [{id: 1, name: 'Salon 1'}, {
                id: 2,
                name: 'Salon 2'
            }]
        });
        const mockConnect = jest.fn().mockResolvedValue({query: mockQuery});
        jest.mock('./db', () => ({sql: {connect: mockConnect}, config: {}}));

        // Test function
        const result = await getSalonFavoris('test@example.com');
        expect(result).toEqual(result);
    });

    test('Test addSalonToFavorites function', async () => {
        // Mock SQL query and response
        const mockQuery = jest.fn();
        const mockConnect = jest.fn().mockResolvedValue({query: mockQuery});
        jest.mock('./db', () => ({sql: {connect: mockConnect}, config: {}}));

        // Test function
        await addSalonToFavorites('test@test.com', 1);
        expect(mockQuery).toEqual(mockQuery)
    });

    test('Test removeSalonFromFavorites function', async () => {
        // Mock SQL query and response
        const mockQuery = jest.fn();
        const mockConnect = jest.fn().mockResolvedValue({query: mockQuery});
        jest.mock('./db', () => ({sql: {connect: mockConnect}, config: {}}));

        // Test function
        await removeSalonFromFavorites('test@test.com', 1);
        expect(mockQuery).toEqual(mockQuery)
    });

    test('Test prendreRendezVous function', async () => {
        // Mock SQL query and response
        const mockQuery = jest.fn();
        const mockConnect = jest.fn().mockResolvedValue({query: mockQuery});
        jest.mock('./db', () => ({sql: {connect: mockConnect}, config: {}}));

        // Test function
        const result = await prendreRendezVous(1, 2, 3, '2024-05-15 10:00:00');
        expect(result).toBe(result)
    });

    test('Test getBabierData function', async () => {
        // Mock SQL query and response
        const mockQuery = jest.fn().mockResolvedValue({
            recordset: [{id: 1, name: 'Babier 1'}, {
                id: 2,
                name: 'Babier 2'
            }]
        });
        const mockRequest = jest.fn(() => ({query: mockQuery}));
        const mockPool = {request: mockRequest};
        jest.mock('./db', () => ({sql: {connect: jest.fn().mockResolvedValue(mockPool)}, config: {}}));

        // Test function
        const req = {}, res = {json: jest.fn()};
        await getBabierData(req, res);
        expect(mockQuery).toBe(mockQuery)
    });

    test('Test getReservationsByCoiffeurId function', async () => {
        // Mock SQL query and response
        const mockQuery = jest.fn().mockResolvedValue({
            recordset: [{id: 1, date: '2024-05-15'}, {
                id: 2,
                date: '2024-05-16'
            }]
        });
        const mockConnect = jest.fn().mockResolvedValue({query: mockQuery});
        jest.mock('./db', () => ({sql: {connect: mockConnect}, config: {}}));

        // Test function
        const result = await getReservationsByCoiffeurId(1);
        expect(result).toEqual(result)
    });

    test('Test getHeuresTravail function', async () => {
        // Mock SQL query and response
        const mockQuery = jest.fn().mockResolvedValue({recordset: [{id: 1, day: 'Monday'}, {id: 2, day: 'Tuesday'}]});
        const mockConnect = jest.fn().mockResolvedValue({query: mockQuery});
        jest.mock('./db', () => ({sql: {connect: mockConnect}, config: {}}));

        // Test function
        const result = await getHeuresTravail(1);
        expect(result).toEqual(result)
    });

    test('Test getUserId function', async () => {
        // Mock SQL query and response
        const mockQuery = jest.fn().mockResolvedValue({recordset: [{clientId: 1}]});
        const mockConnect = jest.fn().mockResolvedValue({query: mockQuery});
        jest.mock('./db', () => ({sql: {connect: mockConnect}, config: {}}));

        // Test function
        const result = await getUserId('test@test.com');
        expect(result).toBe(result);
    });

    test('Test deleteReservation function', async () => {
        // Mock SQL query and response
        const mockQuery = jest.fn();
        const mockConnect = jest.fn().mockResolvedValue({query: mockQuery});
        jest.mock('./db', () => ({sql: {connect: mockConnect}, config: {}}));

        // Test function
        await deleteReservation(1);
        expect(mockQuery).toBe(mockQuery)
    });

    test('Test modifierRendezVous function', async () => {
        // Mock SQL query and response
        const mockQuery = jest.fn();
        const mockConnect = jest.fn().mockResolvedValue({query: mockQuery});
        jest.mock('./db', () => ({sql: {connect: mockConnect}, config: {}}));

        // Test function
        await modifierRendezVous(1, 2, 3, '2024-05-15 10:00:00', 1);
        expect(mockQuery).toBe(mockQuery)
    });

    test('Test isSalonFavorite function', async () => {
        // Mock SQL query and response
        const mockQuery = jest.fn().mockResolvedValue({recordset: [{id: 1, name: 'Salon 1'}]});
        const mockConnect = jest.fn().mockResolvedValue({query: mockQuery});
        jest.mock('./db', () => ({sql: {connect: mockConnect}, config: {}}));

        // Test function
        const result = await isSalonFavorite('test@example.com', 1);
        expect(result).toBe(result);
    });

    test('Test getSalonId function', async () => {
        // Mock SQL query and response
        const mockQuery = jest.fn().mockResolvedValue({recordset: [{salonId: 1}]});
        const mockConnect = jest.fn().mockResolvedValue({query: mockQuery});
        jest.mock('./db', () => ({sql: {connect: mockConnect}, config: {}}));

        // Test function
        const result = await getSalonId('test@test.com');
        expect(result).toEqual(result);
    });

    test('Test modifyClientInfo function', async () => {
        // Mock SQL query and response
        const mockQuery = jest.fn();
        const mockConnect = jest.fn().mockResolvedValue({query: mockQuery});
        jest.mock('./db', () => ({sql: {connect: mockConnect}, config: {}}));

        // Test function
        await modifyClientInfo('test@example.com', 'John', 'Doe', '123456789');
        expect(mockQuery).toBe(mockQuery)
    });

    test('Test getReservationsById function', async () => {
        // Mock SQL query and response
        const mockQuery = jest.fn().mockResolvedValue({recordset: [{id: 1, date: '2024-05-15'}]});
        const mockConnect = jest.fn().mockResolvedValue({query: mockQuery});
        jest.mock('./db', () => ({sql: {connect: mockConnect}, config: {}}));

        // Test function
        const result = await getReservationsById(1);
        expect(result).toEqual(result);
    });

    test('Test getBabierDataBySalonId function', async () => {
        // Mock SQL query and response
        const mockQuery = jest.fn().mockResolvedValue({
            recordset: [{id: 1, name: 'Babier 1'}, {
                id: 2,
                name: 'Babier 2'
            }]
        });
        const mockConnect = jest.fn().mockResolvedValue({query: mockQuery});
        jest.mock('./db', () => ({sql: {connect: mockConnect}, config: {}}));

        // Test function
        const result = await getBabierDataBySalonId(1);
        expect(result).toEqual(result);
    });

    test('Test getCoiffurePreEtablieDataBySalonId function', async () => {
        // Mock SQL query and response
        const mockQuery = jest.fn().mockResolvedValue({
            recordset: [{id: 1, name: 'Coiffure 1'}, {
                id: 2,
                name: 'Coiffure 2'
            }]
        });
        const mockConnect = jest.fn().mockResolvedValue({query: mockQuery});
        jest.mock('./db', () => ({sql: {connect: mockConnect}, config: {}}));

        // Test function
        const result = await getCoiffurePreEtablieDataBySalonId(1);
        expect(result).toEqual(result);
    });

    test('Test getCoiffeurId function', async () => {
        // Mock SQL query and response
        const mockQuery = jest.fn().mockResolvedValue({recordset: [{coiffeurId: 1}]});
        const mockConnect = jest.fn().mockResolvedValue({query: mockQuery});
        jest.mock('./db', () => ({sql: {connect: mockConnect}, config: {}}));

        // Test function
        const result = await getCoiffeurId('test@test.com');
        expect(result).toBe(result);
    });

    test('Test updateSponsor function', async () => {
        // Mock SQL query and response
        const mockQuery = jest.fn();
        const mockConnect = jest.fn().mockResolvedValue({query: mockQuery});
        jest.mock('./db', () => ({sql: {connect: mockConnect}, config: {}}));

        // Test function
        await updateSponsor(1);
        expect(mockQuery).toBe(mockQuery)
    });

    test('Test getSponsorId function', async () => {
        // Mock SQL query and response
        const mockQuery = jest.fn().mockResolvedValue({recordset: [{salonId: 1}]});
        const mockConnect = jest.fn().mockResolvedValue({query: mockQuery});
        jest.mock('./db', () => ({sql: {connect: mockConnect}, config: {}}));

        // Test function
        const result = await getSponsorId();
        expect(result).toBe(result);
    });

    test('Test ajouterAvis function', async () => {
        // Mock SQL query and response
        const mockQuery = jest.fn();
        const mockConnect = jest.fn().mockResolvedValue({query: mockQuery});
        jest.mock('./db', () => ({sql: {connect: mockConnect}, config: {}}));

        // Test function
        await ajouterAvis(1, 2, 5, 'Great service!');
        expect(mockQuery).toBe(mockQuery);
    });

    test('Test getAvisClientsById function', async () => {
        // Mock SQL query and response
        const mockQuery = jest.fn().mockResolvedValue({recordset: [{id: 1, evaluation: 5, message: 'Great service!'}]});
        const mockConnect = jest.fn().mockResolvedValue({query: mockQuery});
        jest.mock('./db', () => ({sql: {connect: mockConnect}, config: {}}));

        // Test function
        const result = await getAvisClientsById(1);
        expect(result).toEqual(result);
    });

    test('Test deleteClientAccount function', async () => {
        // Mock SQL query and response
        const mockQuery = jest.fn();
        const mockConnect = jest.fn().mockResolvedValue({query: mockQuery});
        jest.mock('./db', () => ({sql: {connect: mockConnect}, config: {}}));
        expect(mockQuery).toBe(mockQuery);
    });

    test('Test getAverageRating function', async () => {
        // Mock SQL query and response
        const mockQuery = jest.fn().mockResolvedValue({recordset: [{average_rating: 4.5}]});
        const mockConnect = jest.fn().mockResolvedValue({query: mockQuery});
        jest.mock('./db', () => ({sql: {connect: mockConnect}, config: {}}));

        // Test function
        const result = await getAverageRating('test@example.com');
        expect(result).toBe(result);
    });

});


