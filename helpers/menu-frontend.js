const getMenuFrontEnd = (role = 'USER_ROLE') => {

    const menu = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Mail', url: '/'},
        { titulo: 'ProgressBar', url: 'progress'},
        { titulo: 'Gráficas', url: 'grafica1'},
        { titulo: 'Promesas', url: 'promesas'},
        { titulo: 'rxjs' , url: 'rxjs'}
      ]
    },
    {
      titulo: 'Mantenimiento',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        //{ titulo: 'Usuarios', url: 'user'},
        { titulo: 'Hospitales', url: 'hospital'},
        { titulo: 'Médicos', url: 'medico'}        
      ]
    }
  ];

  if(role === 'ADMIN_ROLE')
  {
    menu[1].submenu.unshift({ titulo: 'Usuarios', url: 'user'})
  }

  return menu;
}

module.exports = {
    getMenuFrontEnd
}