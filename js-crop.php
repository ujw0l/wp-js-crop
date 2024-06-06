<?php
/*
 Plugin Name:JS Crop
 Plugin URI:
 Description: Image cropping gutenberg block for WordPress
 Version: 3.0.0
 Author: Ujwol Bastakoti
 Author URI:https://ujw0l.github.io/
Text Domain:  wp-js-crop
 License: GPLv2
 */

 class wpJsCrop{
     public function __construct(){

      
        add_action('wp_ajax_process_image', array($this ,'processImage'));
    	add_action('wp_ajax_nopriv_process_image', array($this ,'processImage'));
        add_action('init', array($this,'registerWpJsCropBlock')); 
     }

   
     /**
      * Since version 2.0.0
      * 
      *Function to process image
      */

      public function processImage(){

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


/**
 * Since 2.0.0
 * 
 * Register block editor scripts
 */
   public function registerWpJsCropBlock(){

		register_block_type( __DIR__ . '/build',
		array(
			'attributes' => array(
									"fntColor" => ["type"=>"string", "default"=>"rgba(0,0,0,1)"],
									"bgColor" => ["type"=>"string","default"=>"rgba(255,255,255,1)"], 
                                    "blockWd"=>["type"=>"number","default"=>"300"], 
                                    'ajaxUrl'=>["type"=>"string", "default"=>admin_url( 'admin-ajax.php' )]
			),
			"render_callback"=> array($this, 'jsCropBlockRender') )
	);
	

       }

       /**
        *Since 2.0.0
        * 
        *Function to display block on frontend
        */
        public function jsCropBlockRender($atts, $content){


	
            if(is_user_logged_in()):
              ob_start();
                ?>   
     
                <div  style="border:1px dotted <?=$atts["fntColor"]?>; background-color: <?=$atts["bgColor"]?> ;text-align:center;width: <?=$atts['blockWd']?>px;height: 75px;" id="image-load" data-ajax-url="<?=$atts['ajaxUrl']?>">
                             <p style="color:<?=$atts["fntColor"]?>;" ><a style="color:<?=$atts["fntColor"]?>;text-decoration:underline"  id="browse-image" href="javascript:void(0)"><?=__('Browse','wp-js-crop')?></a> <?=__('or  Drop image here','wp-js-crop')?></p>
                     <div style="display:none;" id="hide-input"> <input id="upload-img" type="file" accept="image/*" value="" /></div>
                 </div>      
     
             <?php
               else:
                    ?>  
     
                    <p style="text-align:center;" > <?=__('Login to use this feature','wp-js-crop')?>.<p>
                
         <?php
             endif;
 
             return ob_get_clean();

        }

 }



new wpJsCrop();
	

