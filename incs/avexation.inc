<?php include_once "model/database.php";

$pdo = Database::connect();
	$id = $_REQUEST['id'];
           $sql =  "SELECT * FROM vexations WHERE id = {$id}";
           foreach ($pdo->query($sql) as $row) {
           $comments_count = "SELECT count(*) FROM comments WHERE vexationid = {$id}";
           foreach ($pdo->query($comments_count) as $row2) {
           		$comments_count = $row2["count(*)"];
           }
                    ?>
<div class="nav"><a class= "back">← Back</a></div>
<div class="vexation">
	<div class="vexation-content">
		<?php echo $row['content']; ?><span class="small-text">— #<span class="id"><?php echo $row['id']; ?></span></span>
	</div>
	<div class="vexation-footer">
		<span data-tooltip="novex" class="actionable" href="#novex"><span class="novex emotion"><span class="icon novex"></span> <span class="novex-count"><?php echo $row['novexs']; ?></span></span></span>
		<span data-tooltip="cheya" class="actionable" href="#cheya"><span class="cheya emotion"><span class="icon cheya"></span> <span class="cheya-count"><?php echo $row['cheyas']; ?></span></span></span>
		<span data-tooltip="abegi" class="actionable" href="#abegi"><span class="abegi emotion"><span class="icon abegi"></span> <span class="abegi-count"><?php echo $row['abegis']; ?></span></span></span>
		<span data-tooltip="comments" class="actionable" ><span class="comment emotion"><span class="icon comment"></span> <span class="comment-count"><?php echo $comments_count; ?></span></span></span>
		<span class="inside"><?php echo $row['date']?></span>
	</div>
	<div class="comments">
		<?php
			$sql1 =  "SELECT * FROM comments WHERE vexationid = {$id}";

				if($comments_count == 0) {
					?>

					<div class="comments-card no-comments">No comments yet.</div>

					<?php
				}
	           foreach ($pdo->query($sql1) as $row1) {

	           	?>
					<div class="comments-card"><?php echo $row1['content']?> <span class="inside"><?php echo $row1['date']?></span></div>

	           	<?php
	           }
		?>
	</div>
	<div class="comments-card">
			<div class="comments-header">Post a comment</div>
				<textarea class="rant-box"></textarea>
				<div class="secondary post-comment action-link" data-action="comment">POST</div>
	</div>
</div>

                    <?php
           }
           Database::disconnect();
?>
