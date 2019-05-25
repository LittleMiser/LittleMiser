//
//  PicOnRightCell.m
//  FeedsAPP
//
//  Created by student4 on 2019/5/18.
//  Copyright © 2019 iosGroup. All rights reserved.
//

#import "PicOnRightCell.h"
#import "XWScanImage.h"

@interface PicOnRightCell()

@end

@implementation PicOnRightCell
-(void) setModel:(HomeViewModel *)model
{
    _model = model;
    
    _titleLabel.text = _model.title;
    _model.imageType = 1;
    _rightImage.image = [UIImage imageNamed:_model.rightImage];
    _infoLabel.text = _model.info;
    
    //big img
    UITapGestureRecognizer *tapGestureRecognizer1 = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(scanBigImageClick1:)];
    [_rightImage addGestureRecognizer:tapGestureRecognizer1];
    //让UIImageView和它的父类开启用户交互属性
    [_rightImage setUserInteractionEnabled:YES];
}
- (void)awakeFromNib {
    [super awakeFromNib];
    // Initialization code
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];

    // Configure the view for the selected state
}

#pragma mark - 浏览大图点击事件
-(void)scanBigImageClick1:(UITapGestureRecognizer *)tap{
    NSLog(@"点击图片");
    UIImageView *clickedImageView = (UIImageView *)tap.view;
    [XWScanImage scanBigImageWithImageView:clickedImageView];
}

@end
