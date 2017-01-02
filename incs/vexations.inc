<?php include_once "model/database.php";

$pdo = Database::connect();
           $sql = 'SELECT * FROM vexations ORDER BY id DESC';
           foreach ($pdo->query($sql) as $row) {
           	$id = $row['id'];
                   $comments_count = "SELECT count(*) FROM comments WHERE vexationid = {$id}";
           foreach ($pdo->query($comments_count) as $row2) {
           		$comments_count = $row2["count(*)"];
           }
                    ?>
<div class="vexation" >
	<div class="vexation-content">
		<a class="avexation dyna-link" id="<?php echo $row['id']?>" href="vexation-<?php echo $row['id']; ?>"><?php echo $row['content']; ?><span class="username">— #<?php echo  $row['id']; ?></span></a>
	</div>
	<div class="vexation-footer">
		<a data-tooltip="novex" class="actionable" href="#novex"><span class="novex emotion"><span class="icon novex"></span> <?php echo $row['novexs']; ?></span></a>
		<a data-tooltip="cheya" class="actionable" href="#cheya"><span class="cheya emotion"><span class="icon cheya"></span> <?php echo $row['cheyas']; ?></span></a>
		<a data-tooltip="abegi" class="actionable" href="#abegi"><span class="abegi emotion"><span class="icon abegi"></span> <?php echo $row['abegis']; ?></span></a>
		<a data-tooltip="comments" class="actionable"><span class="comment emotion"><span class="icon comment"></span> <?php echo $comments_count; ?></span></a>
		<span class="inside"><?php echo $row['date']; ?></span>
	</div>
</div>

                    <?php
           }
           Database::disconnect();
?>
