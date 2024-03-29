import {  PupilsModel } from '../../Modules/index';
export class GroupsModel{

    constructor(){
        this._map = new Map();
        this._tmp = [];
    }

    checkExistence(id){
        if(!this._map.get(id)){
            throw new Error('There is no user with this id !');
        }
    }

    iderror(){
        throw new Error('There is no such id !');
    }

    async add(rom){
        let obj = {};
        obj.room = rom;
        obj.id = ((Math.floor(Math.random() * 5001) + rom.toString()) + Math.floor(Math.random() * 1001)).toString();
        this._map.set(obj.id, obj);
        return obj.id;
    }

    async read(id){
        this.checkExistence(id);
        return this._map.get(id);
    }

    async remove(id){
        this.checkExistence(id);
        this._map.delete(id);
    }

    async update(id, obj){
        let oldid = this._map.get(id).id;
        this.checkExistence(id);
        obj.id = oldid;
        this._map.set(id, obj);
    }

    async readAll(){
        let mas = [];
        this._map.forEach((key) => {
            mas.push(this._map.get(key));
        });
        return mas;
    }

    async addPupil(groupId, pupil){
        if(this._map.get(groupId)){
            this._tmp.push({group:this._map.get(groupId), pupilId:pupil.id, "pupil": pupil._map.get(pupil.id)});
        }
        else{
            this.iderror();
        }
    }

    async removePupil(groupId, pupil){
        for(let i=0; i<this._tmp.length; i++){
            if(this._tmp[i].group.id == groupId && this._tmp[i].pupilId == pupil.pid){
                this._tmp.slice(i,i);
            }
        }
    }
}