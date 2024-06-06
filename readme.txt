=== JS Crop ===
Contributors: ujw0l
Donate link: https://www.patreon.com/ujw0l/membership
Tags:  block,Image upload,  Image crop, deep learning
Requires at least: 5.0
Tested up to: 6.5
Requires PHP: 7.0
Stable tag: 3.0.0
License: GPLv2

Plugin which enables user to crop image and upload it which can be access with media page, 


== Description ==
Plugin provides the option of cropping image by browsing/draging and droping image on the front end if user is logged in.
User can then upload the cropped Images which can be access through media page in admin dashboard. 
User also have ability to smart crop using using deep learning.

= Integrations =
* Plugin uses third party object classification model YOLO V5 for TensorflowJS.


== Installation ==

1. Upload the folder `wpJsCrop` and its contents to the `/wp-content/plugins/` directory or use the wordpress plugin installer
2. Activate the plugin through the 'Plugins' menu in WordPress
3. A new "Js Crop Block" option will be available under media in blocks section of post and widget. 
  


= Uninstall =

1. Deactivate Js Crop in the 'Plugins' menu in Wordpress.
2. After Deactivation a 'Delete' link appears below the plugin name, follow the link and confim with 'Yes, Delete these files'.
3. This will delete all the plugin files from the server without erasing  options the plugin has stored in the database.

== Frequently Asked Questions ==

= Why can't I customize it ? =

Keep reviewing the plugin so I will know what people are looking for, I'm working on other features like letting user to apply filters to their image and edit them.  

= Is this plugin mobile freindly ? =

It is designed for PC only

= Where can I use this plugin? =

You can use this plugin as block on post or widget.


== Screenshots ==

1.	Js Crop block on blocks section
2.	JS Crop in effect 



== Changelog ==

= 1.0.0 =
* First stable version 

= 2.0.0 =
* Block added 
* Legacy widget removed 
 =2.1.0=
 *Minor fixes
 =2.5.0=
 *JSX Support for Development
 *Ability to change font color and background color

  =2.5.1=
 *Minor bug fixes

   =2.6.0=
 *Ability to change box width

   =3.0.0=
 *Smart crop using Deep Learning
