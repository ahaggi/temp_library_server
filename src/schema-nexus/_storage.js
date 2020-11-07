
const { idArg, makeSchema, objectType, stringArg, extendType, intArg , arg } = require('@nexus/schema')
const { _StorageWhereInput } = require('./_whereInputTypes')
const { _StorageCreateInput, _StorageWhereUniqueInput } = require('./_createInputTypes')
const { _StorageUpdateInput } = require('./_updateInputTypes')



const Storage = objectType({
    name: 'Storage',
    nullable: true,
    definition(t) {
        t.model.id()
        t.model.quantity()
        t.model.borrowedQuantity()
        t.model.book()
    },
})


const _getStorageByID = (t) => t.field('getStorageByID', {
    type: Storage,
    args: { id: stringArg({ nullable: false }) },
    nullable: true, // OBS findOne
    resolve: (_, { id }, ctx) => {
        return ctx.prisma.storage.findOne({
            where: { id: id }
        })
    }
});

const _getStorageByQuantity = (t) => t.list.field('getStorageByQuantity', {
    type: Storage,
    args: { quantity: intArg() },
    resolve: (_, { quantity }, ctx) => {
        return ctx.prisma.storage.findMany({
            where: { quantity: quantity }
        })
    }
});

const _getStorageByBorrowedQuantity = (t) => t.list.field('getStorageByQuantity', {
    type: Storage,
    args: { borrowedQuantity: intArg() },
    resolve: (_, { borrowedQuantity }, ctx) => {
        return ctx.prisma.storage.findMany({
            where: { borrowedQuantity: borrowedQuantity }
        })
    }
});



//******************************************Costume WhereInput**********************************************************/
const _getStorageBy = (t) => {
    return t.list.field('getStorageBy', {
        type: Storage,
        args: {
            _storageArgs: arg({ type: _StorageWhereInput })
        },
        resolve: (_, { _storageArgs }, ctx) => {
            console.log(_storageArgs)
            return ctx.prisma.storage.findMany({
                where: _storageArgs
            })
        }
    })
};


// const _createStorage = (t) => {

//     t.field('createStorage', {
//       type: Storage,
//       args: {
//         data: arg({ type: _StorageCreateInput }),
//       },
//       resolve: (_, data, ctx) => {
//         return ctx.prisma.storage.create(data)
//       },
//     })
  
//   }
  
  

//   const _updateStorage = (t) => {
//     t.field('updateStorage', {
//       type: Storage,
//       args: {
//         where: arg({ type: _StorageWhereUniqueInput }),
//         data: arg({ type: _StorageUpdateInput }),        // Note that borrowedQuantity should not be updatable via _StorageUpdateInput
//       },
//       resolve: (_, { where, data }, ctx) => {
//         return ctx.prisma.storage.update({
//           where: where,
//           data: data,
//         })
//       },
//     })
  
//   }
  
//   /*
//    mutation {
//      deleteStorage(where:{id:"ckg3ybuvc00164kv8yw1eka6f"}){
//       id
//     }
//   }*/
//   const _deleteStorage = (t) => {
//     t.field('deleteStorage', {
//       type: Storage,
//       args: {
//         where: arg({ type: _StorageWhereUniqueInput }),
//       },
//       resolve: (_, { where }, ctx) => {
//         return ctx.prisma.storage.delete({where: where})
//       },
//     })
  
//   }



module.exports = {
    Storage,
    _getStorageByID,
    _getStorageByQuantity,
    _getStorageByBorrowedQuantity,
    _getStorageBy,

    // _createStorage, 
    // _updateStorage, 
    // _deleteStorage

}