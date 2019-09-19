import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { FirebasePath } from 'src/app/core/shared/firebase-path';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  constructor(private db:AngularFireDatabase) { }

  getAll(categoriaKey:string=null){
    return this.db.list(FirebasePath.PRODUTOS, q => {
      if(categoriaKey){
        return q.orderByChild('categoriaKey').equalTo(categoriaKey);
      }else{
        return q.orderByChild('nome');
      }
    }).snapshotChanges().pipe(
     map(changes => {
       return changes.map(m => ({key: m.payload.key, ...m.payload.val() }));
     }) 
    )
  }
//isso é uma adaptação de preguiçoso

  getcategoriasAll() {
    return this .db.list(FirebasePath.CATEGORIAS).snapshotChanges().pipe(
      map(changes => {
        return changes.map(m => ({ key: m.payload.key, ...m.payload.val() }))
      })
    )
  }

}
