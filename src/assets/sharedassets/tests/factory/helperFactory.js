module.exports = {
    tableFields: [
        {
            fieldName: 'name',
            alignment: 'left',
            isDate: false,
            isDuration: false,
            allowSort: false,
            truncate: true,
            isLink: false
        }
    ],
    sortableTableFields: [
        {
            fieldName: 'updated_at',
            alignment: 'left',
            isDate: false,
            isDuration: false,
            allowSort: true,
            truncate: true,
            isLink: false,
            width: '16%'
        }
    ],
    tableContents: [
        {
            id: 1,
            name: 'name 1'
        },
        {
            id: 2,
            name: 'name 2'
        }
    ]
};
