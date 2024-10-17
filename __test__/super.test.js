import { login } from '../src/js/api/auth/login';
import { logout } from '../src/js/api/auth/logout';
import { save, remove } from '../src/js/storage/index';

jest.mock('../src/js/storage/index', () => ({
    save: jest.fn(),
    load: jest.fn(() => 'mockToken'),
    remove: jest.fn()
}));

global.fetch = jest.fn();

describe('Auth Module', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Login function', () => {
        it('should save token and profile on success', async () => {
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    accessToken: 'mockToken',
                    name: 'mockName'
                })
            });

            const profile = await login('test@example.com', 'password');

            expect(save).toHaveBeenCalledWith('token', 'mockToken');
            expect(save).toHaveBeenCalledWith('profile', { name: 'mockName' });
            expect(profile).toEqual({ name: 'mockName' });
        });

        it('should throw an error on failure', async () => {
            fetch.mockResolvedValueOnce({
                ok: false,
                statusText: 'Unauthorized'
            });

            await expect(login('fakemail123@nope.com', 'wrongPassword')).rejects.toThrow('Unauthorized');
        });
    });

    describe('Logout function', () => {
        it('should remove token and profile from storage', () => {
            logout();

            expect(remove).toHaveBeenCalledWith('token');
            expect(remove).toHaveBeenCalledWith('profile');
        });
    });
});