Ext.namespace('Zarafa.core.ui.notifier');

/**
 * @class Zarafa.core.ui.notifier.DesktopNotification
 * @singleton
 *
 * Singleton class to provide a wrapper for HTML5 desktop notifications feature
 */
Zarafa.core.ui.notifier.DesktopNotification = (function() {
	var notificationAPI = window.webkitNotifications || window.Notification;
	var PERMISSION_DEFAULT = "default";
 	var PERMISSION_GRANTED = "granted";
	var PERMISSION_DENIED = "denied";
	var PERMISSION = [PERMISSION_GRANTED, PERMISSION_DEFAULT, PERMISSION_DENIED];

	return {
		/**
		 * Check if browser supports notifications API
		 */
		supports : function()
		{
			if(notificationAPI) {
				return true;
			}

			return false;
		},

		/**
		 * Check if browser has permissions to show notifications
		 */
		hasPermission : function()
		{
			if(!this.supports()) {
				alert('Browser doesn\'t support notifications');
			}

			var permission = PERMISSION_DEFAULT;
			if(Ext.isFunction(notificationAPI.checkPermission)) {
				permission = PERMISSION[notificationAPI.checkPermission()];
			} else if (notificationAPI.permission) {
				permission = notificationAPI.permission;
			}

			if(permission === 'granted') {
				return true;
			}

			return false;
		},

		/**
		 * Ask for permissions to show notifications
		 */
		authorize : function(callback)
		{
			if(!this.supports()) {
				alert('Browser doesn\'t support notifications');
			}

			callback = Ext.isFunction(callback) ? callback : Ext.emptyFn;

			if (Ext.isFunction(notificationAPI.requestPermission)) {
				notificationAPI.requestPermission(callback);
			}
		},

		/**
		 * Function will show a notification
		 */
		notify : function(title, options)
		{
			if(!this.supports()) {
				alert('Browser doesn\'t support notifications');
			}

			if(!this.hasPermission()) {
				alert('Permission is denied to show desktop notifications');
			}

			var notification;

			if(Ext.isFunction(notificationAPI.createNotifications)) {
				notification = notificationAPI.createNotifications(data.icon, title, data.body);
				notification.show();
			} else {
				notification = new notificationAPI(title, {
					icon : options.icon,
					body : options.body,
					tag : options.tag
				});
			}
		}
	};
})();
