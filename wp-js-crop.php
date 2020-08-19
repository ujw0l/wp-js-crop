<?php
/*
 Plugin Name:Js Crop
 Plugin URI:
 Description: Image cropping plugin for WordPress
 Version: 1.0.0
 Author: Ujwol Bastakoti
 Author URI:https://ujw0l.github.io/
Text Domain:  wp-js-crop
 License: GPLv2
 */

class wpJsCrop extends WP_Widget{
    
    public function __construct() {
        parent::__construct(
            'wpJsCrop', // Base ID
            'Js Crop', // Name
            array( 'description' => __( 'Image cropping plugin for WordPress', 'wp-js-crop' ), ) // Args
            );
       
        add_action( 'widgets_init', array($this,'register_wp_js_crop') );  
        add_action('wp_ajax_process_image', array($this ,'process_image'));
    	add_action('wp_ajax_nopriv_process_image', array($this ,'process_image'));  
    }//end of function construct
    
    
   
    
    public function form( $instance ) {
        if ( isset( $instance[ 'title' ] ) ) {
            
            $title = $instance[ 'title' ];
        }
        else {
            $title = __( 'Js Crop', 'wp-js-crop' );
        }
        
        
        ?>
        
        	<p>
				<label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title:' ); ?></label> 
				
				<input class="widefat" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" type="text" value="<?php echo esc_attr( $title ); ?>" />
		    </p>
		    
        
        <?php

         }//end of function
         
         
         
         /**
          * Sanitize widget form values as they are saved.
          *
          * @see WP_Widget::update()
          *
          * @param array $new_instance Values just sent to be saved.
          * @param array $old_instance Previously saved values from database.
          *
          * @return array Updated safe values to be saved.
          */
         public function update( $new_instance, $old_instance ) {
             $instance = array();
             $instance['title'] = strip_tags( $new_instance['title'] );   
             return $instance;
         }//end of function update
         
                 
         
         /**
          * Front-end display of widget.
          *
          * @see WP_Widget::widget()
          *
          * @param array $args     Widget arguments.
          * @param array $instance Saved values from database.
          */
         public function widget( $args, $instance ) {
  
            $this->js_crop_enequeue_scripts();

            

             extract( $args );
             $title = apply_filters( 'widget_title', $instance['title'] );
             echo $before_widget;
             if ( ! empty( $title ) )
                 echo $before_title . $title . $after_title;
                 
            if(is_user_logged_in()):
           ?>   

           <div style="border:1px dotted rgba(0,0,0,0.5);text-align:center;width: 100%;height: 100px;padding-top: 30px;" id="image-load">
                        <p><a style="text-decoration:underline;" id="browse-image" href="javascript:void(0)"><?=__('Browse','wp-js-crop')?></a> <?=__('or  Drop image here','wp-js-crop')?></p>
                <div style="display:none;" id="hide-input"> <input id="upload-img" type="file" accept="image/*" value="" /></div>
            </div>      

        <?php
          else:
               ?>  

               <p style="text-align:center;" > <?=__('Login to use this feature','wp-js-crop')?>.<p>
           
    <?php
        endif;
         }

   //function to add script on frontend
   public function js_crop_enequeue_scripts(){

    wp_enqueue_script('jsCrop', plugins_url('js/js-crop.js',__FILE__ ));
    wp_enqueue_script('wpJsCrop', plugins_url('js/wp-js-crop.js',__FILE__ ),array('jsCrop'));
    wp_localize_script( 'wpJsCrop', 'js_crop_params',array(
                                                            'my_ajax_url'=> admin_url( 'admin-ajax.php' ),
                                                           
    )
 );


   }  
   
 //function to process ajax content  
 public function process_image(){

    $fileName = wp_get_current_user()->user_login.'_'.time().'.png';
    $outPutFile = wp_upload_dir()['path'].'/'. $fileName;
    $upload_file =   file_put_contents($outPutFile, base64_decode(str_replace(' ', '+',str_replace('data:image/png;base64,', '',$_POST['blob']))));
 
    
    $attachment = array(
        'guid'           => wp_upload_dir()['url'] . '/' .  $fileName, 
        'post_mime_type' => wp_check_filetype( basename( $fileName ), null )['type'],
        'post_title'     =>  sanitize_file_name( pathinfo( basename( $outPutFile), PATHINFO_FILENAME ) ),
        'post_content'   => '',
        'post_status'    => 'inherit'
    );
     
    $attach_id = wp_insert_attachment( $attachment );

if(is_numeric($attach_id)):
// Make sure that this file is included, as wp_generate_attachment_metadata() depends on it.
require_once( ABSPATH . 'wp-admin/includes/image.php' );
 
// Generate the metadata for the attachment, and update the database record.
$attach_data = wp_generate_attachment_metadata( $attach_id,  $outPutFile);

wp_update_attachment_metadata( $attach_id, $attach_data );
echo __('Image sucessfully uploaded','wp-js-crop');
else:
    echo __('Image could not be uploaded','wp-js-crop');
endif;
wp_die();  
}


    //function to register takePic widget
	public function register_wp_js_crop(){
		    register_widget( "wpJsCrop" );
		}     
    
}//end of class


new wpJsCrop();
	