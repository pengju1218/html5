
Ext.application({
	name:'itkingApp',
	launch:function(){
		var view =Ext.create('Ext.NavigationView',{
			items:[
			{
				title:'title1',
				html:'one'
			}]
		});
		
		var panel=Ext.create('Ext.Panel',{
			title:'title2',
			html:'two'
		});
		
		var panel2=Ext.create('Ext.Panel',{
			title:'title3',
			html:'three'
		})		
		
		Ext.Viewport.add(view);
		view.push(panel);
		view.push(panel2);		
		
	}
	
})