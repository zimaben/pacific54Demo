
  
        <?php
            $psts = new WP_Query( array(
                'post_type'=>'form-log',
                'post_status'=> 'publish',
                'posts_per_page'=> 9,
                'orderby'=> 'post_date', 
                'order' => 'DESC'
            ));
            if($psts->have_posts()){
                while($psts->have_posts()) : $psts->the_post();
                    $phone = \get_field('formlog_phone');
                    $email = \get_field('formlog_email');
                    ?>
                        <div class="formlog-card">
                            <div class="formlog-body"><span class="speech"><?php echo apply_filters('the_content', get_the_content());?></span>
                            <span class="just-the-tip"></span>
                            <h4 class="name">🧑 <?php the_title(); ?></h4>
                            </div>
                            <div class="formlog-footer">
                                <h5 class="phone">📱<?php echo $phone; ?></h5>
                                <h5 class="email">✉️ <?php echo $email; ?></h5>
                            </div>
                            
                        </div>
                    <?php

                endwhile;
            }
            \wp_reset_postdata();

        ?>

</div>