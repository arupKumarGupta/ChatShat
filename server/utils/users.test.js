const expect = require('expect');
const {
    Users
} = require('./users');
describe('Users', () => {
    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: 1,
            name: 'Arup',
            room: 'r1'
        }, {
            id: 2,
            name: 'Sasuke',
            room: 'r1'
        }, {
            id: 3,
            name: 'Naruto',
            room: 'r1'
        }, {
            id: 4,
            name: 'Asta',
            room: 'r2'
        }];
    });
    it('should add new User', () => {
        let users = new Users();
        let user = {
            id: 1,
            name: 'arup',
            room: 'room a'
        }
        let newUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });
    it('should return names for r1', () => {
        let userList = users.getUserList('r1');
        expect(userList).toEqual(['Arup', 'Sasuke', 'Naruto']);
    });
    it('should return names for r2', () => {
        let userList = users.getUserList('r2');
        expect(userList).toEqual(['Asta']);
    });
    it('should remove a user', () => {
        let removedUser = users.removeUser(2);
        console.log(users);
        expect(users.users.length).toBe(3);
        expect(removedUser).toMatchObject({
            id: 2,
            name: 'Sasuke',
            room: 'r1'
        });
    });
    it('should not remove a user that does not exist', () => {
        let removedUser = users.removeUser(12);
        expect(users.users.length).toBe(4);
        expect(removedUser).toBeFalsy();
    });
    it('should return the user with given id', () => {
        let user = users.getUser(3);
        expect(user).toMatchObject({
            name: 'Naruto',
            room: 'r1',
            id: 3
        });
    });
    it('should not return the user with given invalid id', () => {
        let user = users.getUser(5);
        expect(user).toBeFalsy();
    });

});